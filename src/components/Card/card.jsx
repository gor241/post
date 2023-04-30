import { useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import { CardContext } from "../../context/cardContext";
import { UserContext } from "../../context/userContext";
import ContentLoader from "react-content-loader";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  IconButton,
  Typography,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@material-ui/icons/Comment";
import { isLiked } from "../../utils/product";
import { Box, CardMedia, Grid } from "@mui/material";
import NoImage from "../bw.png";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    "&:hover": {
      boxShadow: "2px 4px 16px 17px rgba(52, 133, 196, 0.31)",
    },
    "&:active": {
      boxShadow: "2px 4px 16px 17px rgba(52, 196, 96, 0.31)",
    },
  },
  media: {
    height: "20%",
  },
  avatar: {
    backgroundColor: red[500],
  },
  favorite: {
    marginLeft: "auto",
  },
  favoriteActive: {
    color: red[500],
  },
}));

const CardModule = ({ image, comments, tags, author, title, _id, likes }) => {
  const classes = useStyles();
  const { user: currentUser, isLoading } = useContext(UserContext);
  const { handleLike: onProductLike } = useContext(CardContext);
  const liked = isLiked(likes, currentUser?._id);

  const handleLikeClick = useCallback(() => {
    onProductLike({ _id, likes });
  }, [onProductLike]);

  return (
    <>
      {isLoading ? (
        <Grid item xs={12} sm={6} md={4} sx={{ textAlign: "center" }}>
          <ContentLoader
            speed={1}
            width={300}
            height={250}
            viewBox="0 0 300 250"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <path d="M 0 0 h 279.2 v 125 H 0 z M 0 137 h 280 v 8.5 H 0 z M 0 152 h 280 v 26 H 0 z M 0 192 h 280 v 11 H 0 z" />
            <rect x="0" y="210" rx="20" ry="20" width="280" height="40" />
          </ContentLoader>
        </Grid>
      ) : (
        <Grid item xs={12} sm={6} md={4} sx={{ position: "relative" }}>
          <Link to={`/post/post/${_id}`}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
              }}
              className={classes.root}
            >
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    <img
                      src={author.avatar ? author.avatar : NoImage}
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
                subheader={author.about}
              />
              <CardMedia
                image={image ? image : NoImage}
                component="img"
                alt={title}
                sx={{ height: 160 }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = NoImage;
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h3">
                  {title}
                </Typography>
                <Box sx={{ padding: "10px 0", display: "flex", gap: "10px" }}>
                  <CommentIcon />
                  <Typography
                    variant="h5"
                    color="textSecondary"
                    component="span"
                  >
                    {comments.length} comments
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: "7px",
                    fontSize: "8px",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h5"
                    color="textSecondary"
                    component="span"
                  >
                    #Теги:
                  </Typography>
                  {tags &&
                    tags.slice(0, 4).map((tag, index) => (
                      <Box
                        key={index}
                        sx={{
                          color: "white",
                          padding: "4px 8px",
                          backgroundColor: "#41644A",
                          borderRadius: "6px",
                          border: "1px solid black",
                          fontSize: "10px",
                        }}
                      >
                        {tag.length > 10 ? tag.substring(0, 10) + "..." : tag}
                      </Box>
                    ))}
                  {tags && tags.length > 3 && (
                    <Box sx={{ color: "black", fontSize: "18px" }}>...</Box>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Link>
          <Box
            sx={{
              position: "absolute",
              top: "7%",
              right: "7%",
            }}
          >
            <Box>
              <IconButton
                aria-label="add to favorites"
                onClick={handleLikeClick}
                className={
                  classes.favorite + " " + (liked ? classes.favoriteActive : "")
                }
              >
                <FavoriteBorderIcon />
              </IconButton>
              <Typography
                variant="body2"
                color="textSecondary"
                component="span"
              >
                {likes.length} likes
              </Typography>
            </Box>
          </Box>
        </Grid>
      )}
    </>
  );
};

export default CardModule;
