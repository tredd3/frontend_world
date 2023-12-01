/* eslint-disable no-console */
import uuidV1 from 'uuid/v1';
import { needsEnvelope, needsAuthentication, v2ApiRoutes } from '../api-routes';
import { getTokens } from '../../intents';
import { HTTPError, APIError } from '../types';

export type ControlType = { Status: number; MessageCode: number; Message: string };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prepareBody = <RequestBodyType extends Record<string, any>>(body: RequestBodyType, url: string) => {
  const requestBody = {
    Request: {
      Header: {
        DeviceId: '6cf35d17989d3fbe',
        RequestTime: new Date().getTime(),
        RequestId: uuidV1(),
        Version: v2ApiRoutes.includes(url) ? 2.0 : parseFloat(process.env.REACT_APP_API_VERSION!),
        Product: Number(process.env.REACT_APP_PRODUCT_VERSION)
      },
      Body: body || {}
    }
  };

  return needsEnvelope(url) ? { Data: requestBody } : requestBody;
};

type LogType = 'success' | 'error';
type LogInfo = {
  startTime: number;
  url: string;
  fetchOptions: any;
  response: any;
  json?: any;
  type: LogType;
};
const log = ({
  startTime, url, fetchOptions, response, json, type
}: LogInfo) => {
  if (process.env.NODE_ENV === 'development') { // Compiles this block out in non-dev builds
    const { body, ...otherOptions } = fetchOptions;
    console.groupCollapsed(
      `HTTP request: ${url} %c${Date.now() - startTime}ms %c${type}`,
      'color: grey;',
      `color: ${type === 'success' ? 'green' : 'red'}`
    );
    console.log('Request body:', JSON.stringify(JSON.parse(body), null, 2));
    if (json) console.log('Response json', JSON.stringify(json, null, 2));
    console.log('Full request:', { body, ...otherOptions });
    console.log('Full response:', response);
    console.groupEnd();
  }
};

const doesBodyContainError = ({ Control }: { Control: ControlType }) => (
  !Control || Control.Status === 0 || Control.MessageCode === 404
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MakeApiCallOptions<RequestBodyType extends Record<string, any>> =
  Partial<Omit<RequestInit, 'body'>> & { body: RequestBodyType };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async <RequestBodyType extends Record<string, any>, ResponseType>(
  url: string,
  { headers, body, ...otherOptions }: MakeApiCallOptions<RequestBodyType> = { body: {} as RequestBodyType }
) => {
  const tokens = await getTokens();

  const startTime = Date.now();
  const fetchOptions = {
    method: 'POST',
    headers: {
      'X-API-Key': tokens.apiKey,
      'Content-Type': 'application/json',
      'X-REQUEST-ID': uuidV1(),
      'app-name': 'RJIL_JioKart',
      ...(needsAuthentication(url) && { Authorization: `Bearer ${tokens.accessToken}` }),
      ...headers
    },
    body: JSON.stringify(prepareBody<RequestBodyType>(body, url)),
    ...otherOptions
  };
  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    if (process.env.NODE_ENV === 'development') {
      log({
        startTime, url, fetchOptions, response, type: 'error'
      });
    }
    throw new HTTPError(response);
  }
  const json = await response.json();

  if (doesBodyContainError(json)) {
    if (process.env.NODE_ENV === 'development') {
      log({
        startTime, url, fetchOptions, response, json, type: 'error'
      });
    }
    throw new APIError(json);
  }

  if (process.env.NODE_ENV === 'development') {
    log({
      startTime, url, fetchOptions, response, json, type: 'success'
    });
  }

  return json.Data ? json.Data as ResponseType : json.Control as ResponseType;
};
