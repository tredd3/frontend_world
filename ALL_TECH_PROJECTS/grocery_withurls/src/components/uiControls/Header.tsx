import * as React from 'react';
import { useHistory } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { AppBar } from '../Material-UI';
import { AppLogo69 } from '../../assets/images/svg';
import { closeWindow } from '../../intents';
import { isFromMyJioSearch, removeFromMyJioSearch } from '../../helpers/utilities';

/* left icon has default value of menubar from material */
type HeaderProps = {
  title?: any;
  titleComponent?: React.ReactElement<React.ReactType> | null;
  titleStyle?: React.CSSProperties;
  // titleClick?: (e: React.MouseEvent<HTMLDivElement>) => void,
  subtitle?: string | Node;
  subtitleStyle?: React.CSSProperties;
  lefticon1?: React.ReactElement<React.ReactType> | null;
  iconLeftStyle1?: React.CSSProperties;
  leftclick1?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  lefticon2?: React.ReactElement<React.ReactType> | null;
  iconLeftStyle2?: React.CSSProperties;
  lefticon3?: React.ReactElement<React.ReactType> | null;
  leftclick2?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  righticon1?: React.ReactElement<React.ReactType>;
  rightclick1?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  iconRightStyle1?: React.CSSProperties;
  righticon2?: React.ReactElement<React.ReactType>;
  rightclick2?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  iconRightStyle2?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
  image?: string;
  imageHeight?: string;
  headerBackground?: string; // image url
  style?: React.CSSProperties;
  headerContentStyle?: React.CSSProperties;
}

const Header: React.SFC<HeaderProps> = props => {
  const titleStyle: React.CSSProperties = {
    fontWeight: 500,
    fontSize: '16px',
    fontFamily: 'inherit',
    margin: 0,
    ...props.titleStyle
  };

  const subtitleStyle: React.CSSProperties = {
    fontWeight: 300,
    fontSize: '14px',
    fontFamily: 'inherit',
    ...props.subtitleStyle
  };

  const iconLeftStyle1: React.CSSProperties = {
    padding: 0,
    marginLeft: -8,
    paddingRight: 7,
    // top: "8px",
    ...props.iconLeftStyle1
  };

  const iconLeftStyle2: React.CSSProperties = {
    padding: 0,
    // top: "8px",
    ...props.iconLeftStyle2
  };

  const iconLeftStyle3: React.CSSProperties = {
    padding: 0,
    marginLeft: '5px'
  };

  const iconRightStyle1: React.CSSProperties = {
    padding: 0,
    // top: "12px",
    marginRight: 4,
    marginTop: 6,
    ...props.iconRightStyle1
  };
  const iconRightStyle2: React.CSSProperties = {
    padding: 0,
    // top: "12px",
    ...props.iconRightStyle2
  };

  const headerTitle = (
    <div style={{ margin: '0 auto' }}>
      {props.title === "Karun's Mart" ? <AppLogo69 style={titleStyle} /> : <h2 style={titleStyle}>{props.title}</h2>}
      {/* {props.title ? <h2 style={titleStyle}>{props.title}</h2> : null} */}
      {props.subtitle ? <p style={subtitleStyle}>{props.subtitle}</p> : null}
    </div>
  );

  const wrapperStyle = props.style ? props.style : {};
  const headerContentStyle = props.headerContentStyle ? props.headerContentStyle : {};
  const gotoMyJio = () => {
    // eslint-disable-next-line max-len
    window.location.href = 'https://rtss-sit.jioconnect.com/MappServer5/redirectToNativeApp.jsp?a=/dashboard&i=myjio://com.jio.myjio/dashboard';
  };

  const history = useHistory();

  const gotoHome = () => {
    if (isFromMyJioSearch()) {
      removeFromMyJioSearch();
      closeWindow();
    } else {
      history.push('/');
    }
  };

  return (
    <div>
      {props.image && (
        <img
          src={`${props.image}`}
          title={props.title ? `${props.title}` : 'Header'}
          alt={props.title ? `${props.title}` : 'Header'}
          style={{
            height: props.imageHeight ? props.imageHeight : 'auto',
            verticalAlign: 'bottom',
            width: '100%'
          }}
        />
      )}
      {props.title && (
        <AppBar
          style={{
            position: 'static',
            backgroundColor: '#004D9C',
            ...wrapperStyle
          }}
        >
          <Toolbar
            classes={{ root: 'header-vw' }}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              boxSizing: 'border-box',
              minHeight: '45px',
              backgroundColor: '#004D9C',
              zIndex: 900,
              ...headerContentStyle
            }}
          >
            {props.lefticon1 || props.lefticon2 || props.lefticon3 ? (
              <section
                style={{ width: 70 }}
                className="leftIcons"
              >
                {props.lefticon1 && (
                  <IconButton color="inherit" onClick={props.leftclick1} style={iconLeftStyle1}>
                    {props.lefticon1}
                  </IconButton>
                )}
                {props.lefticon2 && (
                  <IconButton color="inherit" onClick={props.leftclick2} style={iconLeftStyle2}>
                    {props.lefticon2}
                  </IconButton>
                )}
                <IconButton color="inherit" onClick={gotoMyJio} style={iconLeftStyle3}>
                  {props.lefticon3}
                </IconButton>
              </section>
            ) : null }
            <span onClick={gotoHome}>
              {props.titleComponent ? props.titleComponent : headerTitle}
            </span>
            <section
              className="rightIcons"
              style={{
                width: 70,
                textAlign: 'right',
                marginRight: '-6px'
              }}
            >
              {props.righticon1 && (
                <IconButton color="inherit" onClick={props.rightclick1} style={iconRightStyle1}>
                  {props.righticon1}
                </IconButton>
              )}
              {props.righticon2 && (
                <IconButton color="inherit" onClick={props.rightclick2} style={iconRightStyle2}>
                  {props.righticon2}
                </IconButton>
              )}
            </section>
          </Toolbar>
        </AppBar>
      )}
    </div>
  );
};

export default Header;
