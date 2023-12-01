import * as React from "react";
import { imagesPath } from "../../config/serviceConstants";

interface IProps {
    history: any;
}

class Splashscreen extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.history.push("/location-screen");
        }, 2000);
    }

    render() {
        return (
            <div>
                <img src={`${imagesPath}/Jio_grocery.jpg`} alt="placeholder image" />
            </div >
        )
    };
}

export default Splashscreen;