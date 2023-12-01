export default {
    Widget3Wrapper: {
        overflowX: "hidden",
        "& .slick-list": {
            "& .slick-track": {
                display: "flex",
                "& .slick-slide": {
                    margin: "0 4px",
                    "& .Widget3": {
                        transition: "width 0.2s ease-out",
                        "& img": {
                            width: '100%'
                        }
                    }
                }
                // "& .slick-active": {
                //     "& .Widget2": {
                //         width: "100%!important"
                //     }
                // }
            }
        },
        "& .slick-dots": {
            display: "flex!important",
            justifyContent: "center",
            "& .slick-active": {
                color: "grey"
            },
            "& li": {
                "& button": {
                    color: "#fff"
                }
            }
        }
    },
    backgroundSlideWidget3Wrapper: {
        overflowX: "hidden",
        "& .slick-list": {
            "& .slick-track": {
                display: "flex",
                "& .slick-slide": {
                    margin: "0 4px",
                    "& .Widget3": {
                        transition: "width 0.2s ease-out",
                        "& img": {
                            width: '100%'
                        }
                    }
                }
            }
        },
        "& .slick-dots": {
            margin: 0,
            display: "flex!important",
            justifyContent: "center",
            "& .slick-active": {
                color: "grey"
            },
            "& li": {
                "& button": {
                    color: "#fff",
                    border: 0,
                    backgroundColor: 'transparent'
                }
            }
        }
    },
    backgroundSlide: {
        "& img": {
            height: "185px",
            width: "auto"
        }
    },
    imgContainer: {
        //backgroundColor: '#eee',
        height: "185px",
        width: "100%"
    }
}
