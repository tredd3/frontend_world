import React from "react";
import Star from "@material-ui/icons/Star";

// interface IProps{
//     rating : number
// }

// interface IState{

// }

class StarRating extends React.Component{

    displayStars(rating) {

        let result = [];
        var i;
        for(i=0;i<rating;i++)
        {
            result.push(
                <Star
                style={{ width : "15px", color: "rgb(225, 173, 1)" }}
                key={i}
                // onClick={this.clickHandler(i)}
              />
            )
        }
        for(i;i<5;i++)
        {
            result.push(
                <Star
                style={{width : "15px", color: "rgb(211, 211, 211)" }}
                key={i}
                // onClick={this.clickHandler(i)}
              />
            )
        }
        return result;
      }
    render()
    {
        return(
           <div>
               {this.displayStars(this.props.rating)}
           </div>
        )
    }
}
export default StarRating;