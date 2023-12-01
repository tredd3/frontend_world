import * as React from "react";
import Icon1 from "@material-ui/icons/CheckCircle";
import Icon2 from "@material-ui/icons/RadioButtonChecked";
import Icon3 from "@material-ui/icons/RadioButtonUnchecked";
import Typography from "@material-ui/core/Typography";
import style from "./style";
import injectSheet from "react-jss";
import Line from "./Line";

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

@injectSheet(style)

class Tracker2 extends React.Component{
    constructor(props)
    {
        super(props)
        this.state={
            showTracker : false
        }
    }

    handleStatus=(status,statusArray)=>{
        if(status==="Canceled")
        {
            return this.handleCanceledCase(status,statusArray);
        }
        else
        {
            return this.handleAllCase(status,statusArray);
        }
    }
    // When handling canceled situation
    handleCanceledCase=(status,statusArray)=>{
        let result=[];
    }

    // When handling All situations
    handleAllCase=(status,statusArray)=>{
        const{classes} = this.props;
        let allStatus = this.getAllStatus();
        let length = Object.keys(allStatus).length;
        let flag = 0;// flag 0 means that the nodes are visisted, 1 means in future they visit
        let result=[];
        let count = 1;// Count ,just to handle the siutaion when i don't need divider
        let left = [];
        let middle = [];
        let right = [];
        for(var items in allStatus)
        {
            if(items === status) // Now Situations
            {
                left.push(
                    <Typography style={{color : "white",background : "blue"}}>
                        NOW
                    </Typography>)

                    middle.push(
                    <span style={{color : "blue"}}>
                        <Icon2/>
                    </span>
                    )


                    if(count<length)
                    {
                        middle.push(
                            <span style={{margin:"-7px 0px -2px 10px"}}>
                                <Line color = "grey"/>
                            </span>
                        )
                    }
                    right.push(
                        <Typography style={{color : "blue"}}>
                            {allStatus[items]}
                        </Typography>
                    )
                flag = 1;
            }
            else
            {
                if(flag === 0)
                {
                    left.push(
                    <Typography className = {classes.leftTextFlag0}>
                        PAST
                    </Typography>)

                    middle.push(
                        <span className = {classes.middleIconFlag0}>
                            <Icon1/>
                        </span>
                        
                    )
                    if(count <length)
                    {
                        middle.push(
                            <span className = {classes.middleLineFlag0}>
                                <Line color = "green"/>
                            </span>
                        )
                    }
                    right.push(
                        <Typography className = {classes.rightTextFlag0}>
                            {allStatus[items]}
                        </Typography>
                    )
                }
                else{
                    left.push(
                        <Typography className = {classes.leftTextFlag1}>
                            LATER
                        </Typography>)
    
                    middle.push(
                        <span className = {classes.middleIconFlag1}>
                            <Icon3/>
                        </span>
        
                        )
                     if(count <length)
                    {
                        middle.push(
                        <span className = {classes.middleLineFlag1}>
                            <Line color = "grey"/>
                        </span>
                        )
                    }
                    right.push(
                        <Typography className = {classes.rightTextFlag1}>
                            {allStatus[items]}
                        </Typography>
                    )
                }
            }
            count = count + 1;
        }
        result.push(
            <div className = {classes.tracker}>
                <div className = {classes.trackerLeft}>
                    {left}
                </div>
                <div className = {classes.trackerMiddle}> 
                   {middle}
                </div>
                <div className = {classes.trackerRight}>
                    {right}
                </div>
            </div>
        )
        return result;
    }

    getAllStatus=()=>{
        let allStatus={};

        allStatus.Confirmed = "Confirmed"

        allStatus.AwaitingConfirmation = "Awaiting Confirmation";

        allStatus.PurchasedByKirana = "Purchased by Kirana";

        allStatus.ReachedKirana = "Reached Kirana";

        allStatus.BilledByKirana = "Billed by Kirana";

        allStatus.OutForDelivery = "Out for Delivery";

        allStatus.Delivered = "Delivered";

        return allStatus;
    }

    handleExpansionClick=()=>{
        if(this.state.showTracker === true)
        {
            this.setState({
                showTracker : false
            })
        }
        else
        {
            this.setState({
                showTracker : true
            })
        }
    }

    getCurrentStatusText=(status)=>{
        if(status === "Confirmed")
        {
            return "Confirmed"
        }
        if(status === "AwaitingConfirmation")
        {
            return "Awaiting Confirmation"
        }
        if(status === "PurchasedByKirana")
        {
            return "Purchased by Kirana"
        }
        if(status === "ReachedKirana")
        {
            return "Reached Kirana"
        }
        if(status === "BilledByKirana")
        {
            return "Billed by Kirana"
        }
        if(status === "OutForDelivery")
        {
            return "Out for Delivery"
        }
        if(status === "Delivered")
        {
            return "Delivered";
        }
    }
    render()
    {
        // const{status,statusArray,classes} = this.props;
        let status = "AwaitingConfirmation"
        let currentStatusText = this.getCurrentStatusText(status);
        let statusArray = [];
        return(
            <ExpansionPanel onClick = {e=>this.handleExpansionClick()}>
                <ExpansionPanelSummary>
                    {
                         this.state.showTracker === false ? 
                         <div style={{width : "100%",display: "flex",justifyContent : "space-evenly"}}>
                             <Icon2 style={{color : "blue"}}/>
                             <Typography style={{color : "blue"}}>
                                 {currentStatusText}
                             </Typography>
                         </div> : 
                         null
                    }
                </ExpansionPanelSummary>

                <ExpansionPanelDetails>
                {
                    this.handleStatus(status,statusArray)
                }
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }
}

export default Tracker2;