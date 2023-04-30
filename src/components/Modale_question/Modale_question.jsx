import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";
import s from "./Modale_question.module.css";
import { Box, Button, Typography } from "@mui/material";
import { useCallback, useContext } from "react";
import { UserContext } from "../../context/userContext";

function Modale_question({ close, postId }) {
  const { flag, setFlag } = useContext(UserContext);
  const navigate = useNavigate();

  const refresh = useCallback(() => {
    setFlag(!flag);
    navigate("/post");
  }, [setFlag]);

  const handleSubmit = () => {
    api.deletePost(postId).then(() => {});
  };

  const handleClickButton = useCallback(
    (e) => {
      e.preventDefault();
      handleSubmit();
      close();
      refresh();
    },
    [handleSubmit, close, refresh]
  );


  return (
    <div className={s.container}>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Typography variant="h4" component="span">
          Вы уверены ?
        </Typography>
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
          color="error"
        >
          Удалить
        </Button>
        <Button variant="outlined" fullWidth onClick={() => close()}>
          Отмена
        </Button>
      </Box>
    </div>
  );
}

export default Modale_question;
