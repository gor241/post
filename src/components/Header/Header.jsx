import * as React from "react";
import s from "./index.module.css";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { Avatar, Box, Menu, MenuItem, Tooltip } from "@mui/material";
import { CardContext } from "../../context/cardContext";
import { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { delUserContent } from "../../reduxToolkit/Slices/registrationkitSlice";
import footerImg from "../Footer/img/footer-bg.webp";
import { Favorite as FavoriteIcon } from "@material-ui/icons";
import { UserContext } from "../../context/userContext";
import { useCallback } from "react";

export default function Header({
  setModalActive,
  token,
  exit,
  children,
  refresh,
  flag,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const user = useSelector((state) => state.registration.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { favorites, setSearchQuery } = useContext(CardContext);
  const { setСrateId, setUserInfo } = useContext(UserContext);

  const refreshIcon = () => {
    refresh(!flag);
    setSearchQuery("");
    setUserInfo("");
    setСrateId("");
    navigate("/post");
  };

  const handleMenu = useCallback(
    (event) => {
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl]
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const profileExit = useCallback(() => {
    setAnchorEl(null);
    setSearchQuery("");
    exit();
    dispatch(delUserContent());
  }, [setAnchorEl, setSearchQuery, exit, delUserContent]);

  const handleProfile = useCallback(() => {
    setAnchorEl(null);
    setModalActive(true);
  }, [setAnchorEl, setModalActive]);

  const GoCreatePost = useCallback(() => {
    setAnchorEl(null);
    setСrateId(user._id);
    setUserInfo(user.name);
    navigate("/post/created");
  }, [setAnchorEl, setUserInfo, setСrateId, user]);

  return (
    <Box
      sx={{ position: "absolute", top: 0, left: 0, width: "100%", zIndex: 50 }}
    >
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#0A2647",
          boxShadow: "-1px 8px 7px 3px rgba(34, 60, 80, 0.6)",
          background: `url(${footerImg}) center/cover no-repeat`,
        }}
      >
        <Toolbar sx={{ display: "flex" }}>
          <IconButton
            size="large"
            edge="start"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={refreshIcon}
            title="На главную"
          >
            <RocketLaunchIcon
              sx={{
                color: "white",
                transition: "all 0.5s ease 0s",
                "&:hover": {
                  color: "red", //  желаемый цвет иконки
                },
                "&:active": {
                  color: "green", //  желаемый цвет иконки
                },
              }}
            />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              justifyContent: "flex-start",
              ml: "50px",
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" }, flexBasis: "200px" }}
            >
              Космические посты
            </Typography>
          </Box>
          {children}
          {token && user && (
            <Box>
              <Tooltip title="Открыть настройки">
                <IconButton onClick={handleMenu}>
                  <Avatar
                    alt="avatar"
                    src={user.avatar}
                    sx={{
                      transition: "all 0.5s ease 0s",
                      "&:hover": {
                        boxShadow: "0px 0px 13px 6px rgba(255, 146, 155, 0.3)",
                      },
                      "&:active": {
                        boxShadow: "0px 0px 13px 6px rgba(185, 255, 146, 0.3)",
                      },
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile}>Открыть профиль</MenuItem>
                <MenuItem onClick={GoCreatePost}>Открыть свои посты</MenuItem>
                <MenuItem onClick={profileExit}>Выйти</MenuItem>
              </Menu>
            </Box>
          )}
          {user && (
            <Box title="Открыть избранное" sx={{ ml: "5px" }}>
              <div className={s.iconsMenu}>
                <Link
                  className={s.favoritesLink}
                  to={{ pathname: "/post/favorites", state: "" }}
                >
                  <FavoriteIcon />
                  {favorites.length !== 0 && (
                    <span className={s.iconBubble}>{favorites.length}</span>
                  )}
                </Link>
              </div>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
