import * as React from 'react'
import * as ReactDOM from 'react-dom'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import Cancel from '@material-ui/icons/Clear'
import './ImageOverlay.css'
class Slider extends React.Component {
  render () {
    const images = this.props.portalImageData
    return ReactDOM.createPortal(
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
          overflowY : "hidden"
        }}
      >
        <Cancel
          onClick={e => {
            this.props.closeSliderPortal()
          }}
        />
        <ImageGallery
          items={images}
          infinite={false}
          lazyLoad={true}
          disableArrowKeys={true}
          showThumbnails={true}
          thumbnailPosition="bottom"
          showFullscreenButton={false}
          showPlayButton={false}
          style={{ display: 'flex' }}
        />
      </div>,
      document.getElementById(this.props.id)
    )
  }
}
export default Slider
