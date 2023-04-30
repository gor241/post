import React, { useCallback, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, IconButton } from "@material-ui/core";
import { ReactComponent as TelegramIcon } from "./img/telegram.svg";
import { ReactComponent as VkIcon } from "./img/vk.svg";
import { ReactComponent as Logo } from "./img/Logo.svg";
import { Menu as MenuIcon } from "@material-ui/icons";
import { Menu, MenuItem } from "@material-ui/core";
import footerImg from "./img/footer-bg.webp";

const useStyles = makeStyles((theme) => ({
  footer: {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    justifyContent: "center",
    position: "relative",
    width: "100%",
    height: "60px",
    marginTop: "30px",
    background: `url(${footerImg}) center/cover no-repeat`,
    padding: "0 20px",
    boxShadow: "-1px -11px 7px 3px rgba(34, 60, 80, 0.6)",
    [theme.breakpoints.down("xs")]: {
      height: "50px",
    },
  },
  logo: {
    height: "40px",
    width: "auto",
    fill: "white",
    cursor: "pointer",
    transition: "all 0.5s ease 0s",
    [theme.breakpoints.down("xs")]: {
      height: "20px",
    },
    "&:hover": {
      fill: "red", //  желаемый цвет иконки
    },
    "&:active": {
      fill: "green", //  желаемый цвет иконки
    },
  },
  socialIcon: {
    height: "30px",
    width: "auto",
    fill: "white",
    marginRight: "7px",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "10px",
      fill: "black",
    },
    transition: "all 0.5s ease 0s",
    "&:hover": {
      fill: "red", //  желаемый цвет иконки
    },
    "&:active": {
      fill: "green", //  желаемый цвет иконки
    },
  },
  menuIcon: {
    height: "30px",
    width: "auto",
    fill: "white",
    transition: "all 0.5s ease 0s",
    "&:hover": {
      fill: "red", //  желаемый цвет иконки
    },
    "&:active": {
      fill: "green", //  желаемый цвет иконки
    },
  },
  author: {
    textAlign: "center",
    fontSize: "14px",
    color: "white",
    [theme.breakpoints.down("xs")]: {
      fontSize: "10px",
    },
  },
}));

const Footer = () => {
  const classes = useStyles();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showIcon, setShowIcons] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = useCallback(
    (e) => {
      setMenuOpen(true);
      setAnchorEl(e.currentTarget);
    },
    [setMenuOpen, setAnchorEl]
  );

  const handleMenuClose = useCallback(() => {
    setMenuOpen(false);
  }, [setMenuOpen]);

  const handleWindowResize = useCallback(() => {
    if (window.innerWidth < 600) {
      // если ширина экрана меньше 600px
      setShowIcons(false); // скрываем иконки
    } else {
      setShowIcons(true); // отображаем иконки
    }
  }, [setShowIcons, setShowIcons]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    // вызываем функцию-обработчик при монтировании компонента
    handleWindowResize();
    // подписываемся на изменение размера окна
    window.addEventListener("resize", handleWindowResize);

    // отписываемся от изменения размера окна при размонтировании компонента
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <footer className={classes.footer}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Logo
            className={classes.logo}
            onClick={scrollToTop}
            title="На вверх"
          />
        </Grid>
        <div className={classes.author}>
          Автор проекта: Руслан Нуриев. 2023 ©
        </div>
        <Grid item>
          {!showIcon ? (
            <IconButton onClick={handleMenuOpen}>
              <MenuIcon className={classes.menuIcon} />
            </IconButton>
          ) : (
            <>
              <IconButton>
                <a target="_blank" href="https://t.me/">
                  <TelegramIcon className={classes.socialIcon} />
                </a>
              </IconButton>
              <IconButton>
                <a target="_blank" href="https://vk.com/">
                  <VkIcon className={classes.socialIcon} />
                </a>
              </IconButton>
            </>
          )}
          <Menu
            open={menuOpen}
            onClose={handleMenuClose}
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleMenuClose}>
              <a target="_blank" href="https://t.me/your-telegram-page">
                <TelegramIcon className={classes.socialIcon} />
              </a>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <a target="_blank" href="https://vk.com/your-vk-page">
                <VkIcon className={classes.socialIcon} />
              </a>
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
