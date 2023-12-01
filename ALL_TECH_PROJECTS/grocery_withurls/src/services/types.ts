/* eslint-disable max-classes-per-file */
import { ControlType } from './helpers/make-api-call';

export class APIError extends Error {
  code: number;

  constructor({ Control }: { Control: ControlType}) {
    super(Control.Message || 'Unexpected response from API');
    this.code = Control.MessageCode;
  }
}

export class HTTPError extends Error {
  status: number;

  constructor(response: Response) {
    super(`${response.status} - ${response.statusText}`);
    this.status = response.status;
  }
}
