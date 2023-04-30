import React, { useState, useCallback, useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  changePassword,
  signInUser,
} from "../../reduxToolkit/Slices/registrationkitSlice";
import Snack from "../../components/Snack/Snack";

export function ResetPage() {
  const { setToken, resetEmail, setResetEmail } = useContext(UserContext);
  const [tokenReset, setTokenReset] = useState("");
  const [password, setPassword] = useState("");
  const [snack, setSnack] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.registration.user);
  const reset = useSelector((state) => state.registration.reset);
  const token = useSelector((state) => state.registration.token);
  const error = useSelector((state) => state.registration.error);

  const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-zA-Z]).{5,}$/;

  function isValidPassword(password) {
    return PASSWORD_REGEX.test(password);
  }

  useEffect(() => {
    if (reset) {
      if (!user) {
        handleLog();
      }
      if (user) {
        api.setToken(token);
        api.setGroup(user.group);
        setResetEmail("");
        setTokenReset("");
        setPassword("");
        setToken(token);
        localStorage.clear();
        localStorage.setItem("token", token);
        localStorage.setItem("group", user.group);
        navigate("/post");
      }
    }
  }, [reset, user]);

  useEffect(() => {
    if (error && password) {
      setSnack(true);
    }
  }, [error]);

  const handleLogin = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(changePassword({ password, token: tokenReset })).unwrap();
    },
    [dispatch, password, tokenReset]
  );

  const handleLog = useCallback(() => {
    dispatch(signInUser({ email: resetEmail, password })).unwrap();
  }, [dispatch, resetEmail, password]);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // отменяем стандартное поведение браузера
      dispatch(signInUser({ resetEmail, password })).unwrap();
    }
  };

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        sx={{
          padding: "15px",
          borderRadius: "20px",
          border: "1px solid #77037B",
          gap: "10px",
          maxWidth: "600px",
        }}
      >
        <form id="login-form" onSubmit={handleLogin} onKeyDown={handleKeyDown}>
          <Typography variant="h5" noWrap component="span">
            Ваш Email: {resetEmail}
          </Typography>
          <TextField
            sx={{ minWidth: "300px" }}
            type="text"
            value={tokenReset}
            required
            onChange={(e) => setTokenReset(e.target.value)}
            label="Код сюда"
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <br />
          <TextField
            type={!showPassword ? "password" : "text"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Пароль"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            error={!isValidPassword(password)}
            helperText={
              !isValidPassword(password) &&
              "Пароль должен содержать минимум 5 символов, хотя бы 1 цифру и 1 букву"
            }
            onKeyDown={handleKeyDown}
            InputProps={{
              endAdornment: (
                <Button onClick={handleClickShowPassword}>
                  {showPassword ? "Hide" : "Show"}
                </Button>
              ),
            }}
          />
          <br />
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Button variant="contained" color="primary" fullWidth type="submit">
              Войти
            </Button>
            <Button fullWidth onClick={() => navigate("/post/login")}>
              Назад
            </Button>
          </Box>
        </form>
        <Snack
          isOpen={snack}
          severity="error"
          text={"Ошибка в токене"}
          handleClose={() => setSnack(false)}
        />
      </Box>
    </Box>
  );
}
