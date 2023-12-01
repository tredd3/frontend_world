import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ChevronLeft } from '../Material-UI';
import Loader from '../uiControls/Loader';

export default ({ iframeURL, showBackButton }) => {
  const [isLoaded, setLoaded] = useState(false);
  const history = useHistory();

  return (
    <>
      {showBackButton && isLoaded && (
        <span
          onClick={() => history.goBack()}
          style={{
            position: 'fixed', left: 15, top: 20, backgroundColor: '#03418e'
          }}
        >
          <ChevronLeft style={{ color: '#fff' }} />
        </span>
      )}
      {isLoaded ? null : <Loader />}
      <iframe
        title="iframe"
        style={{ width: '100vw', height: '100vh', border: 'none' }}
        height={window.innerHeight}
        width={window.innerWidth}
        frameBorder={0}
        src={iframeURL}
        onLoad={() => { setLoaded(true); }}
      />
    </>
  );
};
