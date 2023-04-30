import { useState, useCallback, useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import api from "../../utils/api";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signUpUser,
  signInUser,
} from "../../reduxToolkit/Slices/registrationkitSlice";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Box, Typography } from "@mui/material";
import Snack from "../../components/Snack/Snack";

export function RegisterPage() {
  const { setToken } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [group, setGroups] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [snack, setSnack] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.registration.user);
  const token = useSelector((state) => state.registration.token);
  const error = useSelector((state) => state.registration.error);

  const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-zA-Z]).{5,}$/;

  function isValidPassword(password) {
    return PASSWORD_REGEX.test(password);
  }

  useEffect(() => {
    if (user) {
      if (!token) {
        handleLogin();
      }
      setTimeout(() => {
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
      }, 300);
    }
  }, [user,token]);

  useEffect(() => {
    if (error && email) {
      setSnack(true);
    }
  }, [error]);

  const handleLogin = useCallback(() => {
    dispatch(signInUser({ email, password })).unwrap();
  }, [dispatch, email, password]);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(signUpUser({ email, group, password })).unwrap();
    },
    [dispatch, email, group, password]
  );

  const handleClickShowPassword = useCallback(() => {
    setShowPassword((show) => !show);
  }, []);

  const handleMouseDownPassword = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // отменяем стандартное поведение браузера
      dispatch(signUpUser({ email, group, password })).unwrap();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          padding: "20px",
          borderRadius: "40px",
          border: "1px solid #77037B",
          gap: "10px",
          maxWidth: "350px",
          top: "50%",
          left: "calc(50%-350px)",
        }}
      >
        <form
          id="registre-form"
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
        >
          <Typography variant="h5" noWrap component="p">
            Регистрация
          </Typography>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            fullWidth
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          />
          <TextField
            label="Твоя группа"
            value={group}
            onChange={(e) => setGroups(e.target.value)}
            margin="normal"
            required
            fullWidth
          />
          <TextField
            label="Пароль"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            fullWidth
            error={!isValidPassword(password)}
            helperText={
              !isValidPassword(password) &&
              "Пароль должен содержать минимум 5 символов, хотя бы 1 цифру и 1 букву"
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button fullWidth type="submit" variant="contained" color="primary">
            Зарегистрироваться
          </Button>
          <Button fullWidth onClick={() => navigate("/post/login")}>
            Уже зарегистрированы? Войти
          </Button>
        </form>
      </Box>
      <Snack
        isOpen={snack}
        severity="error"
        text={"Ошибка в регистрации"}
        handleClose={() => setSnack(false)}
      />
    </Box>
  );
}
