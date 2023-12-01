import * as React from "react";
import { Button } from "../../materialUI";
import { imagesPath } from "../../config/serviceConstants";

interface IProps {
    history: any;
}

function Placeholder(props: IProps) {

    function gotoSPlashscreen(e: any) {

        props.history.push("/splash-screen");
    }

    return (
        <div style={{ position: "relative" }}>
            <img src={`${imagesPath}/Random_gif.gif`} alt="placeholder image" />
            <Button
                variant="contained"
                mini
                style={{
                    backgroundColor: "rgb(255,255,255)",
                    padding: "3px 0",
                    color: "black",
                    zIndex: 1,
                    position: "absolute",
                    top: "20px",
                    left: "20px",
                    fontSize: "9px",
                }
                }
                color="primary"
                onClick={gotoSPlashscreen}
            >
                SKIP
            </Button>
        </div >
    );
}
export default Placeholder;