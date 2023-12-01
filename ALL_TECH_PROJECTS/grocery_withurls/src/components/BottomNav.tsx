/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Link } from 'react-router-dom';
import CartIcon from './uiControls/CartIcon';
import { getMobileOperatingSystem } from '../helpers/utilities';
import useMenuDrawer from '../hooks/use-menu-drawer';
import STYLE_CONST from '../constants/style';
import {
  HomeIco, More, MyProfile, MyOrder
} from '../assets/images/svg';
import { cartUrl, ordersUrl } from '../helpers/urls';

const components = {
  shoppingCart: CartIcon,
  more: More,
  home: HomeIco,
  profile: MyProfile,
  myOrder: MyOrder
};

const Icons: React.FC<{icon: string; onClick?: () => void}> = ({ icon }) => {
  const Component = components[icon];
  return <Component location="bottom" />;
};

const navBottom = css`
  height: 55px;
  box-shadow: none;
  position: fixed;
  width: 100%;
  bottom: ${getMobileOperatingSystem() === 3 ? 0 : '55px'};
  padding: 22px;
  border-top: 1px solid #d7d7d7;
  box-sizing: border-box;
  transition: bottom 0.3s;
  background-color: #f7f7f7;
  display: flex;
  align-items: center;
`;

const bottomNav = css`
  height: auto;
  margin-top: 105px;
  `;

const container = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const linkIcon = css`
  position: relative;
  margin: 0;
  display: flex;
  flex-direction: column;
  text-align: center;
  color: #959595;
  text-decoration: none;
  border: 0;
  background: none;
  align-items: center;
`;

const linkName = css`
  font-size: ${STYLE_CONST.fontSize.fs10};
  font-weight: ${STYLE_CONST.fontWeight.bold};
`;

const activeIcon = css`
  color: ${STYLE_CONST.blue.cobalt};
`;

const bottomNavLinks = [
  { name: 'Home', icon: 'home', path: '/' },
  { name: 'Cart', icon: 'shoppingCart', path: cartUrl },
  { name: 'My Orders', icon: 'myOrder', path: ordersUrl },
  { name: 'Profile', icon: 'profile', path: '/account/about' }
];

export default () => {
  const toggleMenuDrawer = useMenuDrawer();

  return (
    <div css={bottomNav}>
      <div css={navBottom}>
        <div css={container}>
          {bottomNavLinks.map(link => (
            <Link key={link.path} to={link.path} css={[linkIcon, link.name === 'Home' ? activeIcon : null]}>
              <Icons icon={link.icon} />
              <span data-page={link.path} css={linkName}>{link.name}</span>
            </Link>
          ))}
          <button css={linkIcon} onClick={() => toggleMenuDrawer(true)}>
            <Icons icon="more" />
            <span css={linkName}>More</span>
          </button>
        </div>
      </div>
    </div>
  );
};
