import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button"
class Deals extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: ""
        }
    }
    render() {
        return (
            <div>
                <TextField
                    label="Name"
                    onChange={(e) => {
                        let Android;
                        if (typeof Android != undefined) {
                            Android.showToast("Hello Its working")
                        }
                        this.setState({
                            name: e.target.value
                        })
                    }}
                />
                <Button onClick={(e) => {
                    console.log("I was entered " + this.state.name)
                }}>
                    Hit me
                </Button>

            </div>
        )
    }
}
export default Deals;