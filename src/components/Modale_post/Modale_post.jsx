import s from "./Modale_post.module.css";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { CardContext } from "../../context/cardContext";
import api from "../../utils/api";
import Image from "mui-image";
import ClearIcon from "@mui/icons-material/Clear";
import { UserContext } from "../../context/userContext";

function Modale_post({ close }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState("");
  const { cards, setCards } = useContext(CardContext);
  const { flag, setFlag } = useContext(UserContext);
  const [errorTitle, setTitleError] = useState("");
  const [errorText, setTextError] = useState("");
  const [errorTags, setTagsError] = useState("");

  const handleTitleChange = useCallback(
    (event) => {
      const value = event.target.value;
      if (value.length < 2) {
        setTitleError("Минимальная длина названия поста - 2 символа");
      } else {
        setTitleError("");
      }
      setTitle(value);
    },
    [setTitleError, setTitle]
  );

  const handleTextChange = useCallback(
    (event) => {
      const value = event.target.value;
      if (value.length < 2) {
        setTextError("Минимальная длина текста поста - 2 символа");
      } else {
        setTextError("");
      }
      setText(value);
    },
    [setTitleError, setText]
  );

  const handleTagChange = useCallback(
    (event) => {
      const value = event.target.value;
      if (value.length < 2) {
        setTagsError("Минимальная длина названия тега - 2 символа");
      } else {
        setTagsError("");
      }
      setTags(value);
    },
    [setTitleError, setTags]
  );

  const handleSubmit = () => {
    const tag =
      typeof tags === "string" ? tags.replaceAll(" ", "").split(",") : tags;
    api.addPost(title, text, image, tag).then((card) => {
      setCards([...cards, card]);
      close();
    });
  };

  const handleClickButtonAdd = () => {
    handleSubmit();
    setFlag(!flag);
  };

  const back = () => {
    setTitle("");
    setText("");
    setImage("");
    setTags("");
    setTitleError("");
    setTextError("");
    setTagsError("");
  };

  const handleClear = () => {
    setImage("");
  };

  return (
    <div className={s.container}>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Typography
          variant="h3"
          component="span"
          sx={{ textShadow: "3px 3px 4px rgba(0,  159,  255, 0.59)" }}
        >
          Создание поста:
        </Typography>
      </Box>
      <Box className={s.img}>
        <div className={s.image}>
          <Image
            src={image}
            height="100%"
            width="100%"
            fit="cover"
            duration={1000}
            easing="cubic-bezier(0.7, 0, 0.6, 1)"
            showLoading={false}
            errorIcon={false}
            shift="bottom"
            distance="100px"
            shiftDuration={900}
            bgColor="inherit"
            alt="my image"
            className={s.image}
          />
        </div>
      </Box>
      <div className={s.box}>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <TextField
              required
              fullWidth
              label="Название поста"
              value={title}
              onChange={handleTitleChange}
              error={!!errorTitle}
              helperText={errorTitle}
              sx={{
                position: "relative",
                "& .MuiFormHelperText-root": {
                  position: "absolute",
                  bottom: "-20px", // Расположение helperText относительно input
                },
              }}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              required
              fullWidth
              label="О чём"
              value={text}
              onChange={handleTextChange}
              error={!!errorText}
              helperText={errorText}
              sx={{
                position: "relative",
                "& .MuiFormHelperText-root": {
                  position: "absolute",
                  bottom: "-20px", // Расположение helperText относительно input
                },
              }}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              id="outlined-basic"
              label="Ссылка на фото"
              variant="outlined"
              required
              value={image}
              fullWidth
              onChange={(e) => {
                setImage(e.target.value);
              }}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleClear} edge="end">
                    <ClearIcon />
                  </IconButton>
                ),
              }}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              required
              fullWidth
              label="Теги, через запятую"
              value={tags}
              onChange={handleTagChange}
              error={!!errorTags}
              helperText={errorTags}
              sx={{
                position: "relative",
                "& .MuiFormHelperText-root": {
                  position: "absolute",
                  bottom: "-15px", // Расположение helperText относительно input
                },
              }}
            />
          </Grid>
        </Grid>
      </div>
      <Grid container spacing={1}>
        <Grid item sm={6} xs={12}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => handleClickButtonAdd()}
            color="primary"
          >
            Отправить
          </Button>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Button variant="outlined" fullWidth onClick={back}>
            Сбросить
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Modale_post;
