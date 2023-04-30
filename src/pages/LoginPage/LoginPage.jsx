import React, { useState, useCallback, useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import api from "../../utils/api";
import { useLocation, useNavigate } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import { Box, Divider, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../../reduxToolkit/Slices/registrationkitSlice";
import Snack from "../../components/Snack/Snack";

export function LoginPage() {
  const { setToken, setResetModalActive } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snack, setSnack] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.registration.user);
  const token = useSelector((state) => state.registration.token);
  const error = useSelector((state) => state.registration.error);

  useEffect(() => {
    if (user) {
      if (token) {
        api.setToken(token);
        api.setGroup(user.group);
        setEmail("");
        setPassword("");
        setToken(token);
        localStorage.clear();
        localStorage.setItem("token", token);
        localStorage.setItem("group", user.group);
        navigate("/post");
      }
    }
  }, [user]);

  useEffect(() => {
    if (error && email) {
      setSnack(true);
    }
  }, [error]);

  const handleLogin = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(signInUser({ email, password })).unwrap();
    },
    [dispatch, email, password]
  );

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // отменяем стандартное поведение браузера
      dispatch(signInUser({ email, password })).unwrap();
    }
  };

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        sx={{
          padding: "20px",
          borderRadius: "40px",
          border: "1px solid #77037B",
          gap: "10px",
        }}
      >
        <form id="login-form" onSubmit={handleLogin} onKeyDown={handleKeyDown}>
          <Typography variant="h5" noWrap component="p" sx={{}}>
            Логин
          </Typography>
          <TextField
            sx={{ minWidth: "300px" }}
            type="text"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
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
            <Button
              variant="outlined"
              fullWidth
              onClick={() => setResetModalActive(true)}
            >
              Забыли пароль
            </Button>
            <Button fullWidth onClick={() => navigate("/post/register")}>
              Регистрация
            </Button>
          </Box>
        </form>
        <Snack
          isOpen={snack}
          severity="error"
          text={"Ошибка в авторизации"}
          handleClose={() => setSnack(false)}
        />
      </Box>
    </Box>
  );
}
