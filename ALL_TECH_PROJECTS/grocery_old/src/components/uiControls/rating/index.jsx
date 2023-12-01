import * as React from "react";
import { StarBorder, Star } from "../../../materialUI";
import injectSheet from 'react-jss';
import style from './style';

@injectSheet(style)

// updateParentState: (partialState: object) => void;
// stateKey: string;
// rating: number;


class Rating extends React.Component {
  // clickHandler = (rating) => {
  //   return (e) => {
  //     this.props.updateParentState({ [this.props.stateKey]: rating });
  //   };
  // };

  displayStars(rating) {
    let result = [];
    if (!rating) {
      for (let i = 1; i <= 5; i++) {
        result.push(
          <StarBorder
            className={this.props.classes.star}
            key={i}
          //onClick={this.clickHandler(i)}
          />
        );
      }
    } else {
      for (let i = 1; i <= rating; i++) {
        result.push(
          <Star
            className={this.props.classes.star}
            key={i}
          //onClick={this.clickHandler(i)}
          />
        );
      }
      for (let i = rating + 1; i <= 5; i++) {
        result.push(
          <StarBorder
            className={this.props.classes.star}
            key={i}
          //onClick={this.clickHandler(i)}
          />
        );
      }
    }
    return result;
  }

  render() {
    const { classes, style } = this.props;
    let rating = this.props.rating ? this.props.rating : 4;
    let totalRatings = this.propstotalRatings ? this.props.totalRatings : 1236;

    return (
      <div className={classes.starWrapper} style={{ ...style }}>
        {this.displayStars(rating)}
        <span className={classes.totalRatings}>{totalRatings}</span>
      </div>
    );
  }
}

export default Rating;
