import React from 'react';
import { trackWindowScroll } from 'react-lazy-load-image-component';
import './Horizontalslider.css';

export default trackWindowScroll(props => {
  const className = (props.className) ? `slider ${props.className}` : 'slider';

  const children = React.Children.map(props.children, child => React.cloneElement(child, {
    scrollposition: props.scrollPosition
  }));

  return (
    <section className={className} style={props.style ? props.style : {}}>
      {children}
    </section>
  );
});
