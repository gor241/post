import { useContext, useState } from "react";
import CardList from "../../components/CardList/card-list";
import { CardContext } from "../../context/cardContext";
import { Box, Button, Typography } from "@mui/material";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

export const FavoritePage = () => {
  const { favorites } = useContext(CardContext);
  const { flag, setFlag } = useContext(UserContext);
  const navigate = useNavigate();

  const refresh = () => {
    setFlag(!flag);
    navigate("/post");
  };
  return (
    <Box sx={{ mt: "2.5rem", position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          top: "-40px",
          left: "5px",
          boxShadow: "0px 4px 16px 8px rgba(34, 60, 80, 0.2)",
          transform: "scale(0.7) translatex(-20px)",
        }}
      >
        <Button variant="contained" color="primary" onClick={refresh}>
          Назад
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Typography variant="h4" component="span">
          Избранное:
        </Typography>
        <div className="content__cards">
          {favorites.length !== 0 ? (
            <CardList cards={favorites} />
          ) : (
            <Typography variant="h5" component="span">
              Нет избранных постов
            </Typography>
          )}
        </div>
      </Box>
    </Box>
  );
};
