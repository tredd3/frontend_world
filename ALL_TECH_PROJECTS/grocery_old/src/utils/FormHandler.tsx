/*import * as React from "react";

interface HandleFormProps {
  handleChange: (e: any) => void;
  handleSubmit: (e: any) => void;
}
// This higher order component wraps FORM functionality
// TProp  will be the props of the passed in component
// We return a component that pick only the properties that are not provided by the HOC
function HandleForm<TProp extends HandleFormProps>(
  Form: React.ComponentType<TProp>,
  callAction: (state: object) => void
) {
  return class extends React.Component<
    Pick<TProp, Exclude<keyof TProp, keyof HandleFormProps>>,
    {}
    > {
    constructor(props: any) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.state = {};
    }

    handleChange(e: any) {
      const { value, name } = e.target;
      this.setState({ [name]: value });
    }

    handleSubmit(e: any) {
      e.preventDefault();
      let state = this.state;
      callAction(state);
    }

    render() {
      return (
        <Form
          {...this.props}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      );
    }
  };
}
export default HandleForm;*/
