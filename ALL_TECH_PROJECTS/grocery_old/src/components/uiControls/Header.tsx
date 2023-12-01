import * as React from 'react';
import { AppBar } from '../../materialUI';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { AppLogo } from "../../assets/images/svg";

/* left icon has default value of menubar from material*/
interface IHeaderProps {
	title?: any,
	titleComponent?: React.ReactElement<React.ReactType> | null,
	titleStyle?: React.CSSProperties,
	titleClick?: (e: React.MouseEvent<HTMLDivElement>) => void,
	subtitle?: string | Node,
	subtitleStyle?: React.CSSProperties,
	lefticon1?: React.ReactElement<React.ReactType> | null,
	iconLeftStyle1?: React.CSSProperties,
	leftclick1?: (e: React.MouseEvent<HTMLSelectElement>) => void,
	lefticon2?: React.ReactElement<React.ReactType> | null,
	iconLeftStyle2?: React.CSSProperties,
	lefticon3?: React.ReactElement<React.ReactType> | null,
	leftclick2?: (e: React.MouseEvent<HTMLSelectElement>) => void,
	righticon1?: React.ReactElement<React.ReactType>,
	rightclick1?: (e: React.MouseEvent<HTMLSelectElement>) => void,
	iconRightStyle1?: React.CSSProperties,
	righticon2?: React.ReactElement<React.ReactType>,
	rightclick2?: (e: React.MouseEvent<HTMLSelectElement>) => void,
	iconRightStyle2?: React.CSSProperties,
	headerStyle?: React.CSSProperties,
	image?: string,
	imageHeight?: string,
	headerBackground?: string, //image url
	style?: React.CSSProperties,
	headerContentStyle?: React.CSSProperties
}

const Header: React.SFC<IHeaderProps> = (props) => {
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
		marginLeft: "5px"
	};

	const iconRightStyle1: React.CSSProperties = {
		padding: 0,
		// top: "12px",
		...props.iconRightStyle1
	};
	const iconRightStyle2: React.CSSProperties = {
		padding: 0,
		// top: "12px",
		...props.iconRightStyle2
	};

	const headerTitle = (
		<div onClick={props.titleClick}>
			{props.title == "JioMart" ? <AppLogo /> : <h2 style={titleStyle}>{props.title}</h2> }
			{props.subtitle ? <p style={subtitleStyle}>{props.subtitle}</p> : null}
		</div>
	);

	const wrapperStyle = props.style ? props.style : {};
	const headerContentStyle = props.headerContentStyle ? props.headerContentStyle : {};
	const gotoMyJio = () => {
		// let closeIntent = {
		// 	type: WebToAppIntent.close,
		// 	data: {}
		// }
		// WebToAppObs.next(JSON.stringify(closeIntent));
		window.location.href = "https://rtss-sit.jioconnect.com/MappServer5/redirectToNativeApp.jsp?a=/dashboard&i=myjio://com.jio.myjio/dashboard";
	}
	return (
		<div style={{ marginBottom: '45px' }}>
			{props.image ? (
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
			) : null}
			{props.title && (
				<AppBar
					style={{
						position: 'static',
						backgroundColor: '#004D9C',
						...wrapperStyle
					}}
				>
					<Toolbar
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							boxSizing: 'border-box',
							minHeight: '45px',
							backgroundColor: '#004D9C',
							position: 'fixed',
							width: '100%',
							zIndex: 900,
							padding: '0 16px',
							top: 0,
							...headerContentStyle
						}}
					>
						<section
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
						{props.titleComponent ? props.titleComponent : headerTitle}
						<section
							className="rightIcons"
							style={{
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
