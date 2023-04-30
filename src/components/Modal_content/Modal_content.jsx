import {
  Box,
  Button,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import s from "./Modale_content.module.css";
import Image from "mui-image";
import { useSelector } from "react-redux";
import { useCallback } from "react";

function Modale_content({ close, openFormContent, openAvatarContent }) {
  const user = useSelector((state) => state.registration.user);
  const handleClickNames = useCallback(
    (e) => {
      e.preventDefault();
      close();
      setTimeout(() => {
        openFormContent();
      }, 300);
    },
    [close, openFormContent]
  );
  const handleClickAvatar = useCallback(
    (e) => {
      e.preventDefault();
      close();
      setTimeout(() => {
        openAvatarContent();
      }, 300);
    },
    [close, openAvatarContent]
  );
  const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Box sx={{ padding: "15px", overflowY: "auto" }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: "10px",
        }}
      >
        <Typography
          sx={{ textShadow: "3px 3px 4px rgba(0,  159,  255, 0.59)" }}
          variant="h4"
          component="span"
        >
          О пользователе:
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box sx={{ position: "relative", height: "300px" }}>
            <Image
              src={
                user
                  ? user.avatar
                  : "https://pofoto.club/uploads/posts/2021-12/thumbs/1640211530_12-pofoto-club-p-sapsan-ptitsa-krasivie-foto-25.jpg"
              }
              height="100%"
              width="100%"
              fit="cover"
              duration={1000}
              easing="cubic-bezier(0.7, 0, 0.6, 1)"
              showLoading={false}
              errorIcon={false}
              distance="100px"
              shiftDuration={900}
              bgColor="inherit"
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              borderRadius: "10px",
              padding: "10px 15px",
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
              borderBottom: "1px solid black",
              borderRadius: "0",
            }}
          >
            <Typography variant="h5" component="span">
              Имя:
            </Typography>
            <Typography variant="h5" component="span">
              {user && user.name}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              borderRadius: "10px",
              padding: "10px 15px",
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
              borderBottom: "1px solid black",
              borderRadius: "0",
            }}
          >
            <Typography variant="h5" component="span">
              Звание:
            </Typography>
            <Typography variant="h5" component="span">
              {user && user.about}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              borderRadius: "10px",
              padding: "10px 15px",
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
              borderBottom: "1px solid black",
              borderRadius: "0",
            }}
          >
            <Typography variant="h5" component="span">
              Email:
            </Typography>
            <Typography variant="h5" component="span">
              {user && user.email}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              borderRadius: "10px",
              padding: "10px 15px",
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
              borderBottom: "1px solid black",
              borderRadius: "0",
            }}
          >
            <Typography variant="h5" component="span">
              Группа:
            </Typography>
            <Typography variant="h5" component="span">
              {user && user.group}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            borderRadius: "10px",
            padding: "10px 15px",
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          {" "}
          <div className={s.buttons}>
            <Button
              fullWidth={isXsScreen}
              variant="contained"
              onClick={handleClickNames}
            >
              Изменить имя
            </Button>
            <Button
              fullWidth={isXsScreen}
              variant="contained"
              onClick={handleClickAvatar}
            >
              Изменить аватар
            </Button>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Modale_content;
