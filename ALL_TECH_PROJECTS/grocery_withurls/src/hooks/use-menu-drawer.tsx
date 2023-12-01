/** @jsx jsx */
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { jsx, css } from "@emotion/core";
import { useHistory } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { Collapse } from "@material-ui/core";
import {
  truncateWithEllipsis,
  getMobileOperatingSystem,
} from "../helpers/utilities";
import { getUser } from "../services/user";
import { UserPivot } from "../types";
import Header from "../components/uiControls/Header";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  SwipeableDrawer,
} from "../components/Material-UI";
import { trackLink } from "../helpers/analytics";
import { closeWindow, chatWithCustomerService } from "../intents";
import {
  categoriesUrl,
  ordersUrl,
  wishlistUrl,
  notificationsUrl,
} from "../helpers/urls";

const styles = {
  contentWrapper: css`
    padding: 0 16px;
    padding-top: 14px;
  `,
  listItem: css`
    padding: 8px 0;
    padding-right: 100px;
    span {
      font-size: 13px;
      font-family: inherit;
    }
  `,
  pr5: css`
    padding-right: 5px;
  `,
  sideDrawer: css`
    padding: 4px 0;
  `,
};

const CustomerServicesList = () => {
  const [open, toggleOpen] = useState(false);
  const history = useHistory();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    toggleOpen(!open);
  };

  return (
    <div>
      <ListItem
        css={[styles.listItem, styles.pr5]}
        button
        onClick={handleClick}
      >
        <ListItemText primary="Customer Services" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            css={styles.listItem}
            onClick={() => {
              trackLink("Help&Faq", "Customer Services", "Bottom");
              history.push("/cart/faqs");
            }}
          >
            <ListItemText primary="Help & FAQs" />
          </ListItem>
          <ListItem
            button
            css={[styles.listItem, styles.pr5]}
            onClick={() => {
              trackLink("Chatwithus", "Customer Services", "Bottom");
              chatWithCustomerService();
            }}
          >
            <ListItemText primary="Chat with us" />
          </ListItem>
        </List>
      </Collapse>
    </div>
  );
};

const trackMenuClick = (linkName: string) =>
  trackLink(linkName, "Menuclicks", "Bottom");

const getMarginStyles = (direction: string | undefined) => ({
  marginBottom:
    direction === "bottom" && getMobileOperatingSystem() !== 3 ? 55 : "",
});

type MenuDrawer = (show: boolean) => void;

const MenuDrawerComponent: React.FC<{
  toggleMenuDrawer: MenuDrawer;
  direction?: string;
}> = ({ toggleMenuDrawer, direction }) => {
  const [user, setUser] = useState<UserPivot | null>(null);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      setUser(await getUser());
    })();
  }, []);

  const gotToHome = () => {
    trackMenuClick("Home");
    const query = new URLSearchParams(history.location.search);
    const shouldClose = query.get("myjiosearch");
    if (shouldClose) {
      closeWindow();
      return;
    }
    history.push("/");
  };

  const goTo = ({ linkName, route }: { linkName: string; route: string }) => {
    trackMenuClick(linkName);
    history.push(route);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      css={getMarginStyles(direction)}
      onClick={() => toggleMenuDrawer(false)}
      onKeyDown={() => toggleMenuDrawer(false)}
    >
      <Header
        title={`Hi ${truncateWithEllipsis(user ? user.firstName : "")}`}
        titleStyle={{ margin: "20px 0 20px 0px", fontWeight: 600 }}
        headerContentStyle={{ justifyContent: "flex-start" }}
      />

      <section css={styles.contentWrapper}>
        <List css={styles.sideDrawer}>
          <ListItem button css={styles.listItem} onClick={gotToHome}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            button
            css={styles.listItem}
            onClick={() =>
              goTo({ route: categoriesUrl, linkName: "Shop By Category" })
            }
          >
            <ListItemText primary="Shop By category" />
          </ListItem>
        </List>
        <Divider />
        <List css={styles.sideDrawer}>
          <ListItem
            button
            css={styles.listItem}
            onClick={() => goTo({ route: ordersUrl, linkName: "My Orders" })}
          >
            <ListItemText primary="My Orders" />
          </ListItem>
          <ListItem
            button
            css={styles.listItem}
            onClick={() =>
              goTo({ route: wishlistUrl, linkName: "My Wishlist" })
            }
          >
            <ListItemText primary="My Wishlist" />
          </ListItem>
          <ListItem
            button
            css={styles.listItem}
            onClick={() =>
              goTo({ route: "/account/about", linkName: "My Profile" })
            }
          >
            <ListItemText primary="My Profile" />
          </ListItem>
          <ListItem
            button
            css={styles.listItem}
            onClick={() =>
              goTo({ route: "/account/addresses", linkName: "My Address" })
            }
          >
            <ListItemText primary="My Addresses & Kirana" />
          </ListItem>
          <ListItem
            button
            css={styles.listItem}
            onClick={() =>
              goTo({ route: notificationsUrl, linkName: "notifications" })
            }
          >
            <ListItemText primary="Notifications" />
          </ListItem>
        </List>
        <Divider />
        <List css={styles.sideDrawer}>
          <CustomerServicesList />
        </List>
      </section>
    </div>
  );
};

const MenuDrawerContext = createContext<MenuDrawer>(() => ({}));

export const MenuDrawerProvider: React.FC<{
  direction: "top" | "bottom" | "left" | "right";
}> = ({ children, direction }) => {
  const [isMenuDrawerVisible, setIsMenuDrawerVisible] = useState(false);
  const toggleMenuDrawer: MenuDrawer = useCallback(() => {
    setIsMenuDrawerVisible(!isMenuDrawerVisible);
  }, [isMenuDrawerVisible]);

  return (
    <MenuDrawerContext.Provider value={toggleMenuDrawer}>
      {children}
      <SwipeableDrawer
        anchor={direction}
        open={isMenuDrawerVisible}
        onClose={() => setIsMenuDrawerVisible(false)}
        onOpen={() => setIsMenuDrawerVisible(true)}
      >
        {isMenuDrawerVisible ? (
          <MenuDrawerComponent
            toggleMenuDrawer={toggleMenuDrawer}
            direction={direction}
          />
        ) : null}
      </SwipeableDrawer>
    </MenuDrawerContext.Provider>
  );
};

export default () => useContext(MenuDrawerContext);
