import {
  Box,
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import s from "./Modal_avatar.module.css";
import { useCallback, useState } from "react";
import Image from "mui-image";
import { setUserAvatar } from "../../reduxToolkit/Slices/registrationkitSlice";
import { useDispatch, useSelector } from "react-redux";
import ClearIcon from "@mui/icons-material/Clear";

function Modal_avatar({ close, openBackForm }) {
  const user = useSelector((state) => state.registration.user);
  const [avatar, setAvatar] = useState("");

  const handleSubmit = async () => {
    await dispatch(setUserAvatar({ avatar: avatar })).unwrap();
  };

  const handleClickAvatar = useCallback(() => {
    handleSubmit();
    close();
  }, [handleSubmit, close]);

  const dispatch = useDispatch();

  const handleClear = useCallback(() => {
    setAvatar("");
  }, [setAvatar]);

  const back = useCallback(() => {
    close();
    setTimeout(() => {
      openBackForm();
    }, 200);
  }, [openBackForm, close]);

  return (
    <div className={s.container}>
      <div className={s.box}>
        <Typography
          sx={{ textShadow: "3px 3px 4px rgba(0,  159,  255, 0.59)" }}
          variant="h3"
          component="span"
        >
          {user.name}
        </Typography>
        <Divider />
        <Box sx={{ maxHeight: "200px", maxWidth: "230px" }}>
          <div className={s.image}>
            <Image
              src={user && avatar}
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
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "30ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Ссылка на фото"
            variant="outlined"
            required
            value={avatar}
            fullWidth
            onChange={(e) => {
              setAvatar(e.target.value);
            }}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleClear} edge="end">
                  <ClearIcon />
                </IconButton>
              ),
            }}
          />
        </Box>
      </div>
      <Button variant="contained" fullWidth onClick={handleClickAvatar}>
        Изменить аватар
      </Button>
      <Button variant="outlined" fullWidth onClick={back}>
        Отмена
      </Button>
    </div>
  );
}

export default Modal_avatar;
