import React from "react";
import style from "./style";
import injectSheet from "react-jss";
import { connect } from "react-redux";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
// import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Sort from "@material-ui/icons/Sort";
import Check from "@material-ui/icons/CheckCircle";
// import Menu from "@material-ui/core/Menu";
// import MenuItem from "@material-ui/core/MenuItem";
// import Typography from "@material-ui/core/Typography";
import PageTemplate from "../uiControls/PageTemplate/PageTemplate";
import Button from "../uiControls/button";
import UserLocation from "../uiControls/Location/UserLocation";
import Filter from "../uiControls/filter";
// import { fetchApi } from "../../helper/network/fetch";
// import API_ROUTES from "../../helper/network/api-routes";
// import store from '../../store'
// import FormLabel from "@material-ui/core/FormLabel";
// import { makeStyles } from "@material-ui/core/styles";
import {
  changeKirana,
  addKiranas,
  addInvites,
  getAllStores
} from "../../actions/kirana";
// @injectSheet(style)

@injectSheet(style)
@connect(
  state => {
    return {
      kirana: state.kirana,
      allKiranas: state.kirana.all,
      selected: state.kirana.selectedKirana,
      selecting: '',
      address: state.userAddress.address
    };
  },
  dispatch => {
    return {
      changeKirana: function (kirana) {
        dispatch(changeKirana(kirana));
      },
      addKiranas: function (kiranas) {
        dispatch(addKiranas(kiranas))
      },
      addInvites: function (invites) {
        dispatch(addInvites(invites))
      },
      getAllStores: function (PageNo = 0, FilterType = 0) {
        dispatch(getAllStores((PageNo, FilterType)))
      }
    };
  }
)
class SelectKirana extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      anchorEl: null,
      sort: "",
      open: false,
      kiranas: (this.props.kirana && this.props.kirana.all) || [],
      invites: (this.props.kirana && this.props.kirana.invites) || []
    };
  }

  handleChange = name => event => {
    this.setState({ value: event.target.value, selecting: name });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.kirana !== this.props.kirana) {
      this.setState({ kiranas: this.props.kirana.all, invites: this.props.kirana.invites });
    }
  }

  handleChangeSort = event => {
    let { kiranas } = this.state;
    if (event.target.value !== "Alphabetical") {
      kiranas.sort(function (a, b) {
        return a.Distance - b.Distance;
      });
    } else {
      kiranas.sort(function (a, b) {
        return a.Name.toLowerCase() > b.Name.toLowerCase() ? 1 : -1;
      });
    }
    this.setState(
      {
        sort: event.target.value,
        kiranas
      },
      () => this.handleClose()
    );
  };

  handleSort = () => {
    console.log("handle sorting");
  };

  clearSort = () => {
    this.setState({
      sort: ""
    });
  };

  componentDidMount() {
    // this.getAllStores();
    if (this.props.address.pincode !== undefined || this.props.address.pincode !== null) this.props.getAllStores();
  }

  // getAllStores = () => {
  //   let pincode = (store.getState().userLocation && store.getState().userLocation.pincode) ? store.getState().userLocation.pincode : 400701

  // fetchApi({
  //   url: API_ROUTES.getStores,
  //   body: {
  //     Lat: 19.12648,
  //     Long: 73.011009,
  //     Pincode: pincode,
  //     CustomerId: 10700377,
  //     IsFavorite: 1,
  //     PageNo: 0,
  //     FilterType: 0
  //   }
  // }).then(res => {
  //   this.props.addKiranas(res.Data.Stores);
  //   this.props.addInvites(res.Data.Invites);
  // });
  // };

  handleClick = event => {
    const { currentTarget } = event;
    this.setState(state => ({
      anchorEl: currentTarget,
      open: !state.open
    }), () => { document.body.style.overflow = 'hidden' });
  };

  handleClose = () => {
    this.setState({
      open: false
    }, () => { document.body.style.overflow = 'scroll' });
  };

  selectKirana = async () => {
    let selectedK;
    if (this.state.selecting !== 'others') {
      selectedK = this.state.invites.filter(store => {
        return parseInt(this.state.value) === store.StoreId;
      });
    }
    else {
      selectedK = this.props.allKiranas.filter(store => {
        return parseInt(this.state.value) === store.StoreId;
      });
    }
    const location = {
      pathname: "/"
    };

    await this.props.changeKirana(selectedK[0])
    this.props.history.push(location);
  };

  kiranaRadioLabel = store => {
    return (
      <div
        style={{
          minHeight: 70,
          display: "flex",
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        {store.Image ? (
          <img
            src={store.Image}
            style={{
              minWidth: 70,
              height: 70,
              marginRight: "10px",
              borderRadius: "3px"
            }}
            alt={store.Name + " image"}
          />
        ) : (
            <div
              style={{
                lineHeight: "70px",
                height: 70,
                minWidth: 70,
                textAlign: "center",
                color: "hsla(0, 0%, 100%, 1)",
                fontSize: "40px",
                backgroundColor: "hsla(12, 87%, 53%, 1)",
                borderRadius: "3px",
                marginTop: "10px",
                marginRight: "10px",
                marginBottom: "10px"
              }}
            >
              {store.Name.charAt(0)}
            </div>
          )}
        <div
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            position: "relative",
            minHeight: "70px"
          }}
        >
          <div>{store.Name}</div>
          <div
            style={{
              marginBottom: "30px",
              color: "hsla(0, 0%, 60%, 1)",
              fontSize: "12px"
            }}
          >
            {store.Address} &#8226;{" "}
            <span style={{ color: "hsla(0, 0%, 40%, 1)" }}>
              {Math.round(store.Distance * 1000) + " m"}
            </span>
          </div>
          <div
            style={{
              marginTop: 'auto',
              color: "hsla(0, 0%, 40%, 1)",
              fontSize: "12px"
            }}
          >
            {store.IsClosed === 1 ? (
              <span style={{ color: "hsla(0, 69%, 53%, 1)", fontWeight: 400 }}>
                Closed
              </span>
            ) : (
                <span
                  style={{ color: "hsla(126, 91%, 31%, 1)", fontWeight: 400 }}
                >
                  Open
              </span>
              )}{" "}
            &#8226; {"10:00am - 06:00pm"}
          </div>
        </div>
      </div>
    );
  };

  selectedKirana = store => {
    return (
      <div
        style={{
          minHeight: 70,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: "0 10px",
          boxShadow: "0px 3px 4px 0px hsla(0, 0%, 0%, 0.16)"
        }}
      >
        {store.Image ? (
          <img
            src={store.Image}
            style={{ width: 70, height: 70, marginRight: "10px" }}
            alt={store.Name + " image"}
          />
        ) : (
            <div
              style={{
                lineHeight: "70px",
                height: "70px",
                width: "70px",
                textAlign: "center",
                color: "hsla(0, 0%, 100%, 1)",
                fontSize: "40px",
                backgroundColor: "hsla(12, 87%, 53%, 1)",
                borderRadius: "3px",
                marginTop: "10px",
                marginRight: "10px",
                marginBottom: "10px"
              }}
            >
              {store.Name.charAt(0)}
            </div>
          )}
        <div
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            position: "relative",
            minHeight: "70px"
          }}
        >
          <div>{store.Name}</div>
          <div
            style={{
              marginBottom: "30px",
              color: "hsla(0, 0%, 60%, 1)",
              fontSize: "12px"
            }}
          >
            {store.Address} &#8226;{" "}
            <span style={{ color: "hsla(0, 0%, 40%, 1)" }}>
              {Math.round(store.Distance * 1000) + " m"}
            </span>
          </div>
          <div
            style={{
              marginTop: 'auto',
              color: "hsla(0, 0%, 40%, 1)",
              fontSize: "12px"
            }}
          >
            {store.IsClosed === 1 ? (
              <span style={{ color: "hsla(0, 69%, 53%, 1)", fontWeight: 400 }}>
                Closed
              </span>
            ) : (
                <span
                  style={{ color: "hsla(126, 91%, 31%, 1)", fontWeight: 400 }}
                >
                  Open
              </span>
              )}{" "}
            &#8226; {"10:00am - 06:00pm"}
          </div>
        </div>
        <div style={{ marginLeft: "auto", color: "hsla(126, 91%, 31%, 1)" }}>
          <Check /> {/* Puttin a green check icon here bro*/}
        </div>
      </div>
    );
  };

  render() {
    const { classes, history } = this.props;
    const {
      value,
      anchorEl,
      sort,
      open,
      kiranas
    } = this.state;
    // const id = open ? "sort-popper" : null;

    return (
      <div className={classes.root}>
        <PageTemplate history={history} subSection={false} righticon2={false} lefticon2={false}>
          <UserLocation parentHandler={this.props.getAllStores} />
          {open ? (<Filter anchorEl={anchorEl} handleClose={this.handleClose}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                className={"header"}
                style={{
                  backgroundColor: "hsla(0, 0%, 96%, 1)",
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px "
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "105px"
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      color: "hsla(0, 0%, 20%, 1)"
                    }}
                  >
                    SORT
                          </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "hsla(0, 0%, 60%, 1)"
                    }}
                  >
                    {sort}
                  </div>
                </div>
                <div
                  style={{
                    textTransform: "uppercase",
                    color: "hsla(0, 0%, 60%, 1)",
                    fontSize: "12px"
                  }}
                  onClick={this.clearSort}
                >
                  Clear All
                        </div>
              </div>
              <FormControl
                component="fieldset"
                className={classes.formControl}
              >
                <RadioGroup
                  aria-label="Sort"
                  name="Sort"
                  value={sort}
                  onChange={this.handleChangeSort}
                >
                  <FormControlLabel
                    classes={{
                      root: classes.radioSpace + " " + classes.radioPad
                    }}
                    value={"Closest First"}
                    control={
                      <Radio
                        classes={{
                          root: classes.radioColor
                        }}
                      />
                    }
                    label="Closest First"
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    classes={{
                      root: classes.radioSpace + " " + classes.radioPad
                    }}
                    value={"Alphabetical"}
                    control={
                      <Radio
                        classes={{
                          root: classes.radioColor
                        }}
                      />
                    }
                    label="Alphabetical"
                    labelPlacement="start"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </Filter>) : null}
          {this.props.kirana &&
            this.props.kirana.selectedKirana &&
            Object.keys(this.props.kirana.selectedKirana).length > 0 ? (
              <div
                style={{
                  backgroundColor: "hsla(0, 0%, 96%, 1)",
                  padding: "10px"
                }}
              >
                <h3
                  style={{
                    margin: "0 15px 5px 0",
                    fontSize: "14px",
                    textTransform: "uppercase"
                  }}
                >
                  Your Current Kirana Partner
              </h3>
                <div
                  style={{
                    backgroundColor: "#fff"
                  }}
                >
                  {this.selectedKirana(this.props.kirana.selectedKirana)}
                </div>
              </div>
            ) : null}

          {this.state.invites.length > 0
            ? (<>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "0 15px 0 15px"
                }}
              >
                <h3
                  style={{
                    margin: "10px 15px 5px 0",
                    fontSize: "14px",
                    textTransform: "uppercase"
                  }}
                >
                  New Kirana Invites
            </h3>
              </div>
              <FormControl component="fieldset" className={classes.formControl}>
                {/* <FormLabel component="legend">Gender</FormLabel> */}
                <RadioGroup
                  aria-label="Select your prefered Kirana Store"
                  name="kirana"
                  className={classes.group}
                  value={value}
                  onChange={this.handleChange("invites")}
                >
                  {this.state.invites.map((store, i) => (
                    <FormControlLabel
                      classes={{
                        root: classes.radioSpace
                      }}
                      key={store.StoreId}
                      value={store.StoreId + ""}
                      control={
                        <Radio
                          classes={{
                            root: classes.radioColor
                          }}
                        />
                      }
                      label={this.kiranaRadioLabel(store)}
                      labelPlacement="start"
                    />
                  ))}
                </RadioGroup>
              </FormControl></>)
            : null
          }
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "15px 15px 0 15px"
            }}
          >
            <h3
              style={{
                margin: "10px 15px 5px 0",
                fontSize: "14px",
                textTransform: "uppercase"
              }}
            >
              Other Kiranas in your area
            </h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: "hsla(208, 100%, 37%, 1)"
              }}
              onClick={this.handleSort}
              aria-owns={anchorEl ? "sort-button" : null}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <Sort />
              &nbsp; Sort
            </div>
          </div>
          {kiranas.length > 0 ? (
            <FormControl component="fieldset" style={{ marginBottom: 70 }} className={classes.formControl}>
              <RadioGroup
                aria-label="Select your prefered Kirana Store"
                name="kirana"
                className={classes.group}
                value={value}
                onChange={this.handleChange("others")}
              >
                {kiranas.map((store, i) => (
                  <FormControlLabel
                    classes={{
                      root: classes.radioSpace
                    }}
                    key={store.StoreId}
                    value={store.StoreId + ""}
                    control={
                      <Radio
                        classes={{
                          root: classes.radioColor
                        }}
                      />
                    }
                    label={this.kiranaRadioLabel(store)}
                    labelPlacement="start"
                  />
                ))}
              </RadioGroup>
            </FormControl>
          ) : null}
          <div className={"footer-div"} style={{ display: 'flex' }}>
            {/* <button
              style={{
                backgroundColor: "hsla(210, 100%, 30%, 1)",
                border: "none",
                color: "#fff",
                width: "92%",
                height: "50px",
                fontSize: "14px",
                fontWeight: "700",
                borderRadius: "2px"
              }}
              onClick={this.selectKirana}
            >
              Save
            </button> */}
            <div style={{ width: "100%", padding: "0 10px", backgroundColor: '#fff' }}>
              <Button text={'Cancel'} type={"solidGray"} onClick={() => history.push('/')} />
            </div>
            <div style={{ width: "100%", padding: "0 10px", backgroundColor: '#fff' }}>
              <Button text={'Save'} type={"solidTulip"} onClick={this.selectKirana} disable={value == ""} />
            </div>
          </div>
        </PageTemplate>
      </div>
    );
  }
}

export default SelectKirana;
