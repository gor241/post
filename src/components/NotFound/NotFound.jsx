import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";

import notFoundImg from "./img/404.gif";
import { useContext } from "react";
import { CardContext } from "../../context/cardContext";

export const NotFound = ({
  children,
  title = "Страница не найдена",
  buttonText = "На главную",
  buttonAction,
}) => {
  const { handleInputChange } = useContext(CardContext);
  const navigate = useNavigate();
  const location = useLocation();
  const ButtonClick = () => {
    navigate("/post");
  };
  return (
    <Container sx={{ textAlign: "center", mt: 8 }}>
      <img
        srcSet={`${notFoundImg} 1x, ${notFoundImg} 2x`}
        src={notFoundImg}
        alt=""
        aria-hidden="true"
        style={{ maxWidth: "100%", height: "auto" }}
      />
      <Typography variant="h4" component="h1" sx={{ mt: 4 }}>
        {title}
      </Typography>
      {children && <div>{children}</div>}
      {!buttonAction && (
        <Button variant="contained" sx={{ mt: 4 }} onClick={ButtonClick}>
          {buttonText}
        </Button>
      )}
    </Container>
  );
};
