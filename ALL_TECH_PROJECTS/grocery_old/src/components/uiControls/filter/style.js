import STYLE_CONST from '../../../constants/style';
export default {
    backdrop: {
        width: "100vw",
        height: "100vh",
        opacity: "0.6",
        zIndex: 1,
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "hsla(0, 0%, 20%, 0.7)"
    },
    popper: {
        zIndex: 1,
        '&[x-placement*="bottom"] $arrow': {
            top: 0,
            right: "5px",
            marginTop: '-0.9em',
            minWidth: '3em',
            height: '1em',
            '&::before': {
                borderWidth: '0 1em 1em 1em',
                borderColor: `transparent transparent hsla(0, 0%, 96%, 1) transparent`,
            },
        },
        '&[x-placement*="top"] $arrow': {
            bottom: 0,
            left: 0,
            marginBottom: '-0.9em',
            width: '3em',
            height: '1em',
            '&::before': {
                borderWidth: '1em 1em 0 1em',
                borderColor: `hsla(0, 0%, 96%, 1) transparent transparent transparent`,
            },
        },
        '&[x-placement*="right"] $arrow': {
            left: 0,
            marginLeft: '-0.9em',
            height: '3em',
            width: '1em',
            '&::before': {
                borderWidth: '1em 1em 1em 0',
                borderColor: `transparent hsla(0, 0%, 96%, 1) transparent transparent`,
            },
        },
        '&[x-placement*="left"] $arrow': {
            right: 0,
            marginRight: '-0.9em',
            height: '3em',
            width: '1em',
            '&::before': {
                borderWidth: '1em 0 1em 1em',
                borderColor: `transparent transparent transparent hsla(0, 0%, 96%, 1)`,
            },
        },
    },
    arrow: {
        position: 'absolute',
        left: "auto!important",
        fontSize: 7,
        width: '3em',
        height: '3em',
        '&::before': {
            content: '""',
            margin: 'auto',
            display: 'block',
            width: 0,
            height: 0,
            borderStyle: 'solid',
        }
    }
}
