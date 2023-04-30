import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography } from "@material-ui/core";

export function MainPage() {
  const navigate = useNavigate();

  const onLoginClick = useCallback(() => {
    navigate("/post/login");
  }, []);

  const onRegisterClick = useCallback(() => {
    navigate("/post/register");
  }, []);

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "5rem" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Здравствуйте, пожалуйста зарегистрируйтесь (или войдите)
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={onRegisterClick}
        style={{ margin: "1rem" }}
      >
        Зарегистрироваться
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={onLoginClick}
        style={{ margin: "1rem" }}
      >
        Логин
      </Button>
    </Container>
  );
}
