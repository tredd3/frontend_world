import * as React from "react";
import './Horizontalslider.css';
import { trackWindowScroll } from 'react-lazy-load-image-component';

const HorizontalSlider = (props) => {

    let className = (props.className) ? `slider ${props.className}` : "slider";
    const children = React.Children.map(props.children, child => {
        return React.cloneElement(child, {
            scrollposition: props.scrollPosition
        });
    });
    return (
        <section className={className} style={props.style ? props.style : {}}>
            {children}
        </section>
    )
};

export default trackWindowScroll(HorizontalSlider);