import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import s from "./Modale_password.module.css";
import { Box, Button, TextField, Typography } from "@mui/material";
import Snack from "../Snack/Snack";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";

function Modale_password({ close }) {
  const [email, setEmail] = useState("");
  const [snack, setSnack] = useState(false);
  const [textMessage, setTextMessage] = useState("");
  const { setResetEmail, resetModalActive } = useContext(UserContext);
  const navigate = useNavigate();

  const refresh = () => {
    navigate("/post/resetPassword");
  };

  const handleSubmit = () => {
    api.resetPassword(email).then((obj) => {
      if (!obj.err) {
        setTextMessage(obj.message);
      } else setTextMessage("Ошибка сервера");
    });
  };

  const handleClickButton = useCallback(
    (e) => {
      e.preventDefault();
      setResetEmail(email);
      handleSubmit();
      close();
      refresh();
    },
    [setResetEmail, handleSubmit, close, refresh, email]
  );

  useEffect(() => {
    if (resetModalActive) {
      setEmail("");
    }
  }, [resetModalActive]);

  return (
    <div className={s.container}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4" component="span">
          Введите свой Email:
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <TextField
          sx={{ minWidth: "130%", }}
          type="text"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "100%",
        }}
      >
        <Button
          variant="contained"
          fullWidth
          onClick={handleClickButton}
          color="info"
        >
          Отправить
        </Button>
        <Button variant="outlined" fullWidth onClick={() => close()}>
          Отмена
        </Button>
      </Box>
      <Snack
        isOpen={snack}
        severity="error"
        text={textMessage}
        handleClose={() => setSnack(false)}
      />
    </div>
  );
}

export default Modale_password;
