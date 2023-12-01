import * as React from "react";
import SearchBar from "../../uiControls/SearchBar";
import injectSheet from 'react-jss';
import style from './style';

@injectSheet(style)

class HeaderSubsection extends React.Component {
    ShopBycategory = (e) => {
        this.props.history.push('/shopby-category')
    }
    wishList = (e) => {
        this.props.history.push('/wishList')
    }
    render() {
        const { classes, showCategories, headerSubsectionStyle } = this.props;
        return (
            <div className={classes.headerSubsection} style={headerSubsectionStyle}>
                <SearchBar
                    hintText="what are you looking for?"
                    handleFocus={this.props.handleFocus}
                    handleSearchUpdate={this.props.handleSearchUpdate}
                    searchwrapperStyle={{ borderBottom: "none", backgroundColor: "#fff" }}
                    inputText={this.props.inputText}
                />
                {showCategories ?
                    (<section className={classes.titleSection}>
                        <span className={classes.shopBycategory} onClick={this.ShopBycategory}><span style={{ margin: 0, fontSize: 10 }}>Shop By</span> Category</span>
                        <span onClick={this.wishList}>Wish List</span>
                        {/* 
                         <span>Deals</span>
                        <span>Sell</span> */}
                    </section>) : null}

            </div>
        );
    }
}


export default HeaderSubsection;