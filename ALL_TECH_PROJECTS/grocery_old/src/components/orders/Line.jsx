import * as React from "react";
class Line extends React.Component{

    render()
    {
        const {color} = this.props;
        return(
            <div
                style={{
                    borderLeft:"2px solid",
                    height : "60px",
                    color : color
                }}
            >
                </div>
        )
    }
}
export default Line;