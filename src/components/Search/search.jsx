import "./index.css";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import BlockIcon from "@mui/icons-material/Block";
import React, { useState, useCallback, useContext } from "react";
import { useLocation } from "react-router-dom";
import { CardContext } from "../../context/cardContext";

const Searc = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "auto",
  zIndex: 1,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function Search({ onSubmit: propsOnSubmit, onInput }) {
  const { setCards, timeCards } = useContext(CardContext);
  const [inputText, setInputText] = useState("");
  const location = useLocation();
  const handleInput = useCallback(
    (e) => {
      setInputText(e.target.value);
      onInput && onInput(e.target.value);
    },
    [setInputText, onInput]
  );

  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      propsOnSubmit(inputText);
      // setInputText("")
    },
    [propsOnSubmit, inputText]
  );

  const handleClearInput = useCallback(() => {
    setInputText("");
    setCards(timeCards);
    onInput && onInput("");
  }, [setInputText, onInput, inputText]);

  return (
    <>
      <Searc>
        <SearchIconWrapper>
          {inputText ? (
            <BlockIcon onClick={handleClearInput} sx={{ cursor: "pointer" }} />
          ) : (
            <SearchIcon onClick={handleFormSubmit} sx={{ cursor: "pointer" }} />
          )}
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Поиск…"
          inputProps={{ "aria-label": "search" }}
          value={inputText}
          onChange={handleInput}
        />
      </Searc>
    </>
  );
}

export default Search;
