import { useState, useEffect } from 'react';
import { getTokens } from '../intents';
// eslint-disable-next-line camelcase, @typescript-eslint/camelcase
import { DEPRECATED_setTokensInStore } from '../intents/store-compatibility';

export default ({ children }) => {
  const [displayChildren, setDisplayChildren] = useState(false);

  useEffect(() => {
    getTokens()
      .then(DEPRECATED_setTokensInStore)
      .then(() => setDisplayChildren(true));
  }, []);

  return displayChildren ? children : null;
};
