import React from "react";
class Intersection extends React.Component {
    ref = React.createRef()

    async componentDidMount() {
        let observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.intersectionRatio === 1) {
                    this.props.onVisible();
                    observer.unobserve(entry.target);
                    console.log("unobserved")
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 1.0
            }
        )

        // console.log("Intersection Observer is "+this.ref.current);
        if (this.ref.current) {
            observer.observe(this.ref.current)
        }
    }

    render() {
        return (
            <div ref={this.ref}>
                {this.props.children}
            </div>
        )
    }
}
export default Intersection;