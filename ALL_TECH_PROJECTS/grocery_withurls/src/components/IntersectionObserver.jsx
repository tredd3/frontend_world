import React from 'react';

class Intersection extends React.Component {
    ref = React.createRef()

    componentDidMount() {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.intersectionRatio === 1) {
            this.props.onVisible();
            observer.unobserve(entry.target);
            this.ref = null;
          }
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 1.0
        }
      );

      // console.log("Intersection Observer is "+this.ref.current);
      if (this.ref.current) {
        observer.observe(this.ref.current);
      }
    }

    render() {
      const { observeImage = false } = this.props;
      const style = observeImage ? { height: '100%' } : {};
      return (
        <div ref={this.ref} style={style}>
          {this.props.children}
        </div>
      );
    }
}
export default Intersection;
