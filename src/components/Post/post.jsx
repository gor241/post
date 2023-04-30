import s from "./index.module.css";
import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  IconButton,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
} from "@material-ui/icons";
import { isLiked } from "../../utils/product";
import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { Box, Chip } from "@mui/material";
import { Close } from "@mui/icons-material";
import { CardContext } from "../../context/cardContext";
import NoImage from "../bw.png";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import Image from "mui-image";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "1200px",
    padding: "15px",
    borderRadius: "15px",
    boxShadow: "0px 4px 16px 8px rgba(34, 60, 80, 0.2)",
  },
  media: {
    minHeight: "100%",
    [theme.breakpoints.down("sm")]: {
      minHeight: "50vh",
    },
  },
  avatar: {
    backgroundColor: "red",
    cursor: "pointer",
    boxShadow: "0px 0px 13px 3px rgba(34, 60, 80, 0.5)",
    transition: "all 0.5s ease 0s",
    "&:hover": {
      boxShadow: "0px 0px 13px 3px rgba(241, 87, 87, 0.9)",
    },
    "&:active": {
      boxShadow: "0px 0px 13px 3px rgba(241, 87, 87, 0.9)",
    },
  },
}));

const useStyles2 = makeStyles((theme) => ({
  heartButton: {
    borderRadius: "50%",
    border: "2px solid transparent",
    backgroundColor: "transparent",
    transition: "background-color 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: theme.palette.error.main,
    },
    "&:active": {
      backgroundColor: theme.palette.error.light,
    },
  },
  heartIcon: {
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.2)",
    },
  },
}));

const useStyles3 = makeStyles({
  dialogPaper: {
    animation: "$dialogSlide .5s",
  },
  "@keyframes dialogSlide": {
    "0%": {
      transform: "translateY(-40%)",
      opacity: 0,
    },
    "100%": {
      transform: "translateY(0)",
      opacity: 1,
    },
  },
});

export const Post = ({
  likes = [],
  postId,
  image,
  comment,
  tags,
  author,
  text,
  title,
  setComment,
  created_at,
  onProductLike,
}) => {
  const {
    user: currentUser,
    flag,
    setFlag,
    setСrateId,
    setUserInfo,
  } = useContext(UserContext);
  const { openEditPostContent, delPostContent, setSearchQuery, searchQuery } =
    useContext(CardContext);
  const [open, setOpen] = useState(false);
  const [openUser, setUserOpen] = useState(false);
  const [idChangeComment, setidChangeComment] = useState(null);
  const [userInfo, setUserInfos] = useState({});
  const navigate = useNavigate();
  const classes = useStyles();
  const classes2 = useStyles2();
  const classes3 = useStyles3();
  const isLike = isLiked(likes, currentUser?._id);
  const [onComment, setOnComment] = useState("");
  const [redComment, setRedComment] = useState("");

  const setCommit = useCallback(() => {
    api.setPostComment(postId, { text: onComment }).then((newData) => {
      setComment(newData.comments);
      setOnComment("");
    });
  }, [setComment, setOnComment, onComment, postId]);

  const delCommit = useCallback(
    (idComment) => {
      api.deletePostComment(postId, idComment).then((newData) => {
        setComment(newData.comments);
        setOnComment("");
      });
    },
    [setComment, setOnComment]
  );

  const handleOpen = useCallback(
    (id, text) => {
      setidChangeComment(id);
      setRedComment(text);
      setOpen(true);
    },
    [setidChangeComment, setRedComment, setOpen]
  );

  const getUserInfo = (user) => {
    setUserInfos(user);
    setUserOpen(true);
  };

  const GoCreatePost = useCallback(
    (id, name) => {
      setСrateId(id);
      setUserInfo(name);
      setUserOpen(false);
      setTimeout(() => {
        navigate("/post/created");
      }, 500);
    },
    [setСrateId, setUserOpen, setUserInfo]
  );

  const closeUserInfo = () => {
    setUserOpen(false);
    setUserInfos("");
  };

  const changeComment = useCallback(() => {
    api.deletePostComment(postId, idChangeComment).then((newData) => {
      api.setPostComment(postId, { text: redComment }).then((newData) => {
        setComment(newData.comments);
        setRedComment("");
        setidChangeComment(null);
        setOpen(false);
      });
    });
  }, [
    setOpen,
    setUserInfos,
    setComment,
    setRedComment,
    setidChangeComment,
    idChangeComment,
    redComment,
  ]);

  const refresh = useCallback(() => {
    setSearchQuery("");
    setFlag(!flag);
    navigate("/post");
  }, [setSearchQuery, setFlag]);

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: "-40px",
          left: "5px",
          boxShadow: "0px 4px 16px 8px rgba(34, 60, 80, 0.2)",
          transform: "scale(0.8) translatex(-15px)",
        }}
      >
        <Button variant="contained" color="primary" onClick={refresh}>
          Назад
        </Button>
      </Box>
      <Grid container sx={{ background: "white" }} className={classes.root}>
        <Grid item xs={12} md={6}>
          <CardMedia
            className={classes.media}
            image={image ? image : NoImage}
            title={`Изображение ${title}`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = NoImage;
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                position: "absolute",
                top: "35px",
                right: "15px",
                "@media (max-width: 600px)": {
                  top: "25px",
                  right: "-55px",
                },
              }}
              title={currentUser._id === author._id ? "Удалить пост" : ""}
            >
              <Grid
                container
                spacing={0.7}
                sx={
                  currentUser._id !== author._id
                    ? {
                        position: "relative",
                        "&::before": {
                          content: `'${"Это не ваш пост"}'`,
                          position: "absolute",
                          top: "35px",
                          left: "50%",
                          width: "120px",
                          transform: "translateX(-50%)",
                          padding: "5px",
                          backgroundColor: "#000",
                          color: "#fff",
                          borderRadius: "5px",
                          opacity: 0,
                          visibility: "hidden",
                          transition:
                            "opacity 0.6s ease-in-out, visibility 0.2s ease-in-out",
                        },
                        "&:hover::before": {
                          opacity: 1,
                          visibility: "visible",
                        },
                      }
                    : {}
                }
              >
                <Grid item xs={7} sm={6}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => openEditPostContent(postId)}
                    color="warning"
                    disabled={currentUser._id === author._id ? false : true}
                    sx={{ fontSize: "9px", padding: "5px 0px 5px 0px" }}
                    title={
                      currentUser._id === author._id ? "Редактировать пост" : ""
                    }
                  >
                    Edit
                  </Button>
                </Grid>
                <Grid item xs={7} sm={6}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => delPostContent(postId)}
                    color="error"
                    disabled={currentUser._id === author._id ? false : true}
                    sx={{ fontSize: "9px", padding: "5px 0px 5px 0px" }}
                    title={
                      currentUser._id === author._id
                        ? "Удалить пост"
                        : "Это не ваш пост"
                    }
                  >
                    Del
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", ml: "-15px" }}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="post author" className={classes.avatar}>
                      <img
                        src={
                          author.avatar
                            ? author.avatar
                            : "https://www.bmpharma.com.tr/wp-content/uploads/2018/10/noimage.png"
                        }
                        alt="post author"
                        style={{ width: "50px", height: "50px" }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = NoImage;
                        }}
                      />
                    </Avatar>
                  }
                  title={author.name}
                  subheader={created_at.substring(0, 16) + "..."}
                  onClick={() => getUserInfo(author)}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Box sx={{ display: "flex", alignItems: "center", ml: "-8px" }}>
                  <IconButton
                    className={classes2.heartButton}
                    aria-label="like"
                    onClick={onProductLike}
                  >
                    {isLike ? (
                      <FavoriteIcon
                        color="error"
                        className={`${classes.heartIcon} ${classes.heartIconActive}`}
                      />
                    ) : (
                      <FavoriteBorderIcon className={classes2.heartIcon} />
                    )}
                  </IconButton>
                  <Typography
                    variant="caption"
                    component="p"
                    style={{ marginLeft: "8px" }}
                  >
                    {likes.length}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  {tags &&
                    tags.map((tag, id) => (
                      <Chip
                        label={tag}
                        key={id}
                        variant="outlined"
                        size="small"
                        sx={{ mr: "5px" }}
                      />
                    ))}
                </Box>
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
              >
                <Typography variant="h5" component="h2">
                  {title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {text}
                </Typography>
                <Typography variant="h6" component="h3" gutterBottom>
                  Комментарии:
                </Typography>
              </Box>
              <Box>
                {comment &&
                  comment.map((item) => (
                    <Box
                      key={item._id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        mb: "10px",
                      }}
                    >
                      <Box title="О пользователе">
                        <Avatar
                          aria-label="comment author"
                          className={item._id}
                          onClick={() => getUserInfo(item && item.author)}
                          sx={{
                            cursor: "pointer",
                            boxShadow: "0px 0px 13px 3px rgba(34, 60, 80, 0.5)",
                            transition: "all 0.5s ease 0s",
                            "&:hover": {
                              boxShadow:
                                "0px 0px 13px 3px rgba(241, 87, 87, 0.9)",
                            },
                            "&:active": {
                              boxShadow:
                                "0px 0px 13px 3px rgba(241, 87, 87, 0.9)",
                            },
                          }}
                        >
                          <img
                            src={item.author.avatar}
                            alt="post author"
                            style={{ width: "50px", height: "50px" }}
                          />
                        </Avatar>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                          flex: "1 1 auto",
                        }}
                      >
                        <Typography variant="subtitle1" component="p">
                          {item.author.name}:
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          color="textSecondary"
                          component="p"
                          sx={{ flex: "1 1 auto" }}
                        >
                          {item.text}
                        </Typography>
                        {currentUser._id === item.author._id ? (
                          <Box>
                            <IconButton
                              onClick={() => handleOpen(item._id, item.text)}
                              title="Редактировать комментарий"
                            >
                              <CreditCardIcon sx={{ color: "red" }} />
                            </IconButton>
                            <IconButton
                              onClick={() => delCommit(item._id)}
                              title="Удалить коментарий"
                            >
                              <Close sx={{ color: "black" }} />
                            </IconButton>
                          </Box>
                        ) : (
                          false
                        )}
                        <Dialog
                          open={open}
                          onClose={() => setOpen(false)}
                          classes={{ paper: classes3.dialogPaper }}
                        >
                          <DialogTitle>Редактировать комментарий</DialogTitle>
                          <DialogContent>
                            <TextField
                              label="Комментарий"
                              multiline
                              rows={4}
                              value={redComment}
                              variant="outlined"
                              onChange={(e) => {
                                setRedComment(e.target.value);
                              }}
                              fullWidth
                              sx={{ margin: "10px 0" }}
                            />
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={() => setOpen(false)}>
                              Отмена
                            </Button>
                            <Button onClick={() => changeComment()}>
                              Сохранить
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </Box>
                    </Box>
                  ))}
                <Dialog
                  open={openUser}
                  onClose={() => closeUserInfo()}
                  classes={{ paper: classes3.dialogPaper }}
                >
                  <DialogTitle
                    sx={{
                      textAlign: "center",
                      borderBottom: "1px solid black",
                      mb: "10px",
                      fontSize: "19px",
                    }}
                  >
                    Информация о пользователе
                  </DialogTitle>
                  <DialogContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Box sx={{ height: "300px" }}>
                          <Image
                            src={
                              userInfo
                                ? userInfo.avatar
                                : "https://www.bmpharma.com.tr/wp-content/uploads/2018/10/noimage.png"
                            }
                            height="100%"
                            width="100%"
                            fit="cover"
                            duration={1000}
                            easing="cubic-bezier(0.7, 0, 0.6, 1)"
                            showLoading={false}
                            errorIcon={false}
                            distance="100px"
                            shiftDuration={900}
                            bgColor="inherit"
                          />
                        </Box>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <Grid
                          item
                          xs={12}
                          sx={{
                            padding: "10px 5px",
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "10px",
                            borderBottom: "1px solid black",
                            borderRadius: "0",
                            overflowX: "auto",
                            overflowY: "hidden",
                          }}
                        >
                          <Typography variant="h5" component="span">
                            Имя:
                          </Typography>
                          <Typography variant="h5" component="span">
                            {userInfo && userInfo.name}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sx={{
                            padding: "10px 5px",
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "10px",
                            borderBottom: "1px solid black",
                            borderRadius: "0",
                            overflowX: "auto",
                            overflowY: "hidden",
                          }}
                        >
                          <Typography variant="h5" component="span">
                            Звание:
                          </Typography>
                          <Typography variant="h5" component="span">
                            {userInfo && userInfo.about}
                          </Typography>
                        </Grid>
                        {/* <Grid
                          item
                          xs={12}
                          sx={{
                            borderRadius: "10px",
                            padding: "10px 5px",
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "10px",
                            borderBottom: "1px solid black",
                            borderRadius: "0",
                            overflowX: "auto",
                            overflowY: "hidden",
                          }}
                        >
                          <Typography variant="h5" component="span">
                            Email:
                          </Typography>
                          <Typography variant="h5" component="span">
                            {userInfo.email ? userInfo.email : author.email}
                          </Typography>
                        </Grid> */}
                        <Grid
                          item
                          xs={12}
                          sx={{
                            padding: "10px 5px",
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "10px",
                            borderBottom: "1px solid black",
                            borderRadius: "0",
                            overflowX: "auto",
                            overflowY: "hidden",
                          }}
                        >
                          <Typography variant="h5" component="span">
                            Группа:
                          </Typography>
                          <Typography variant="h5" component="span">
                            {userInfo && userInfo.group}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </DialogContent>
                  <DialogActions
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                      flexDirection: "column",
                      minWidth: "300px",
                      "@media (min-width: 600px)": {
                        flexDirection: "row",
                      },
                    }}
                  >
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={closeUserInfo}
                    >
                      Закрыть
                    </Button>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => GoCreatePost(userInfo._id, userInfo.name)}
                    >
                      Посты пользователя
                    </Button>
                  </DialogActions>
                </Dialog>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  mb: "-15px",
                }}
              >
                <TextField
                  label="Текст комментария"
                  variant="outlined"
                  fullWidth
                  value={onComment}
                  onChange={(e) => {
                    setOnComment(e.target.value);
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setCommit()}
                  fullWidth
                >
                  Добавить комментарий
                </Button>
              </Box>
            </CardContent>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
