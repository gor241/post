import { useDispatch } from "react-redux";
import s from "./Modale_form.module.css";
import { useCallback, useState } from "react";
import { setUserInfo } from "../../reduxToolkit/Slices/registrationkitSlice";
import { Box, Button, TextField, Typography } from "@mui/material";

function Modale_form({ close, openBackForm }) {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  const handleSubmit = async () => {
    await dispatch(setUserInfo({ name: name, about: about })).unwrap();
  };

  const handleClickButtonEdit = useCallback(
    (e) => {
      e.preventDefault();
      handleSubmit();
      close();
    },
    [handleSubmit, close]
  );

  const dispatch = useDispatch();

  const back = useCallback(() => {
    close();
    setTimeout(() => {
      openBackForm();
    }, 200);
  }, [openBackForm, close]);

  return (
    <div className={s.container}>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Typography variant="h5" component="span">
          Введите имя и звание:
        </Typography>
      </Box>
      <div className={s.box}>
        <TextField
          required
          fullWidth
          label="Имя"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <TextField
          required
          fullWidth
          label="Звание"
          value={about}
          onChange={(e) => {
            setAbout(e.target.value);
          }}
        />
      </div>
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
          onClick={handleClickButtonEdit}
          color="primary"
        >
          Отправить
        </Button>
        <Button variant="outlined" fullWidth onClick={back}>
          Отмена
        </Button>
      </Box>
    </div>
  );
}

export default Modale_form;
