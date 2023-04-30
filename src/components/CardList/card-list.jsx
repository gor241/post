import { useCallback, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CardContext } from "../../context/cardContext";
import { UserContext } from "../../context/userContext";
import { SortContext } from "../../context/sortContext";
import { NotFound } from "../NotFound/NotFound";
import CardModule from "../Card/card";
import {
  Box,
  Fab,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Pagination from "@mui/material/Pagination";

const CardList = ({ cards, sortOrder }) => {
  const navigate = useNavigate();
  const { isLoading } = useContext(UserContext);
  const { selectedTabId } = useContext(SortContext);
  const { openNewPostContent, modalActive } = useContext(CardContext);
  const location = useLocation();
  const { page, setPage, rowsPerPage, setRowsPerPage } =
    useContext(CardContext);

  const totalPages = Math.ceil(cards.length / rowsPerPage);

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const rowsPerPageOptions = [9, 18, 30];

  const handleChangePage = useCallback(
    (event, newPage) => {
      setPage(newPage);
    },
    [setPage]
  );

  const handleChangeRowsPerPage = useCallback(
    (event) => {
      setRowsPerPage(parseInt(event.target.value));
      setPage(1);
    },
    [setPage, setRowsPerPage]
  );

  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const size = isSmallScreen ? "small" : "medium";

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "70vh" }}>
      {!cards.length && !isLoading && (
        <Grid container spacing={2} sx={{ position: "relative", mb: "20px" }}>
          <Grid item xs={12} sx={{ position: "relative" }}>
            <NotFound
              buttonText="Назад"
              title="Код 404: Простите по вашему запросу ничего не найдено! Перефразируйте запрос и попробуйте снова! "
              buttonAction={() => navigate("/post")}
            />
          </Grid>
        </Grid>
      )}
      <Box sx={{ flex: "1 1 auto" }}>
        <Grid container spacing={2} sx={{ position: "relative" }}>
          {cards
            .sort((a, b) => {
              switch (selectedTabId) {
                case "by time":
                  const dateA = new Date(a.created_at);
                  const dateB = new Date(b.created_at);
                  return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
                case "by likes":
                  return sortOrder === "desc"
                    ? b.likes.length - a.likes.length
                    : a.likes.length - b.likes.length;
                case "by comments":
                  return sortOrder === "desc"
                    ? b.comments.length - a.comments.length
                    : a.comments.length - b.comments.length;
              }
            }).slice(startIndex, endIndex)
            .map((item) => (
              <CardModule key={item._id} {...item} />
            ))}
          {(location.pathname === "/post"||location.pathname === "/post/") && (
            <Fab
              sx={
                modalActive
                  ? { display: "none" }
                  : {
                      position: "fixed",
                      bottom: "10%",
                      right: "2%",
                      "@media (max-width: 600px)": {
                        bottom: "20%",
                      },
                    }
              }
              color="primary"
              aria-label="add"
              onClick={() => openNewPostContent()}
            >
              <AddIcon />
            </Fab>
          )}
        </Grid>
      </Box>
      <Box
        sx={
          !cards.length && !isLoading
            ? { display: "none" }
            : {
                display: "flex",
                alignItems: "center",
                mt: "20px",
                justifyContent: "center",
              }
        }
      >
        <Pagination
          count={totalPages}
          variant="outlined"
          size={size}
          page={page}
          onChange={handleChangePage}
        />
        <FormControl sx={{ transform: "scale(0.8)", minWidth: "70px" }}>
          <Select
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
          >
            {rowsPerPageOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default CardList;
