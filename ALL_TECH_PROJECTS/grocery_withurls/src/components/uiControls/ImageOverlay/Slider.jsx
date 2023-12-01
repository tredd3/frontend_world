import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import Cancel from '@material-ui/icons/Clear';
import './ImageOverlay.css';

export default ({ id, portalImageData, closeSliderPortal }) => ReactDOM.createPortal(
  <div
    style={{
      position: 'fixed',
      top: '0',
      bottom: '0',
      left: '0',
      right: '0',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      zIndex: 2000,
      overflowY: 'hidden'
    }}
  >
    <Cancel onClick={closeSliderPortal} />
    <ImageGallery
      items={portalImageData}
      infinite={false}
      lazyLoad
      disableArrowKeys
      showThumbnails
      thumbnailPosition="bottom"
      showFullscreenButton={false}
      showPlayButton={false}
      style={{ display: 'flex' }}
    />
  </div>,
  document.getElementById(id)
);
