import * as React from "react";
import { connect } from "react-redux";
import Header from "../uiControls/Header";
import InputTextField from "../uiControls/InputTextField";
import { Checkbox } from "../../materialUI";
import { Close } from "../../materialUI";
import CustomButton from "../uiControls/CustomButton";
import { createAccount } from "../../actions/createAccount"
import { IAppState } from "../../store"

// history is passed from route component and otherprops are passed from store
// dispatch is a store method and is passed as a prop by react-redux to the connected component

interface IProps {
    history: any;
    accountCreation: string;
    dispatch: any;
}

interface IState {
    firstname: string;
    lastname: string;
    [key: string]: any
}

class CreateAccount extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = { firstname: "", lastname: "" };
    }

    handleChange = (key: string) => (e: any) => {
        const { value } = e.target;
        this.setState({ [key]: value });
    }

    handleSubmit = (e: any) => {
        const { dispatch, history } = this.props;
        e.preventDefault();
        dispatch(createAccount(this.state)).then(() => history.push("/addAddress"))
    }

    render() {
        return (
            <div>
                <Header
                    title="JioKart"
                    titleStyle={{
                        padding: "20px"
                    }}
                    lefticon1={<Close style={{ marginRight: "40px" }} />}
                    leftclick1={() => {
                        this.props.history.goBack();
                    }}
                />
                <form style={{ padding: "0 16px" }}>
                    <div >
                        <InputTextField
                            InputLabelProps={{
                                color: "rgba(0, 0, 0, 0.7)"
                            }}
                            type="text"
                            placeholder="First Name"
                            autoFocus={true}
                            value={this.state.firstname}
                            onChange={this.handleChange("firstname")}
                            name="firstname"
                        />
                        <InputTextField
                            InputLabelProps={{
                                color: "rgba(0, 0, 0, 0.7)"
                            }}
                            type="text"
                            placeholder="Last Name"
                            value={this.state.lastname}
                            onChange={this.handleChange("lastname")}
                            name="lastname"
                        />
                    </div>
                    <br />
                    <Checkbox color="primary" />
                    <CustomButton
                        buttonText="Continue"
                        onClick={this.handleSubmit}
                    />
                </form>
            </div>
        );
    }
}

// mapStateToProps is function receives the entire store state, and returns an object of data 
// this component needs. It is called every time the store state changes and Login component gets updated
function mapStateToProps(state: IAppState) {
    return { accountCreation: state.createAccount }
}

export default connect(mapStateToProps)(CreateAccount);