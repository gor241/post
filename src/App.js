import React, { useCallback, useEffect, useMemo, useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./App.css";
import { Box, Container, CssBaseline } from "@mui/material";
import { isLiked } from "./utils/product";
import SeachInfo from "./components/SeachInfo";
import { IndexPage } from "./pages/IndexPage/IndexPage";
import { FaqPage } from "./pages/FAQPage/faq-page";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { FavoritePage } from "./pages/FavoritePage/favorite-page";
import { NotFoundPage } from "./pages/NotFoundPage/not-found-page";
import Modale_form from "./components/Modale_form/Modale_form";
import Footer from "./components/Footer/footer";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "./context/userContext";
import { CardContext } from "./context/cardContext";
import Modal from "./components/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import Modal_avatar from "./components/Modal_avatar/Modal_avatar";
import api from "./utils/api";
import Modale_content from "./components/Modal_content/Modal_content";
import Search from "./components/Search/search";
import { PostPage } from "./pages/PostPage/PostPage";
import { SortContext } from "./context/sortContext";
import { setIsUserContent } from "./reduxToolkit/Slices/registrationkitSlice";
import Modale_post from "./components/Modale_post/Modale_post";
import Modale_EditPost from "./components/Modale_EditPost/Modale_EditPost";
import Modale_question from "./components/Modale_question/Modale_question";
import Snack from "./components/Snack/Snack";
import Modale_password from "./components/Modale_password/Modale_password";
import { ResetPage } from "./pages/ResetPage/ResetPage";
import Header from "./components/Header/Header";
import useDebounce from "./utils/useDebounce";
import { CreatedPostsPage } from "./pages/CreatedPostsPage/CreatedPostsPage";

function App() {
  const [cards, setCards] = useState([]);
  const [snackAdd, setAddSnack] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [snackDel, setDelSnack] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [selectedTabId, setSelectedTabId] = useState("by time");
  const [modalActive, setModalActive] = useState(false);
  const [resetModalActive, setResetModalActive] = useState(false);
  const [token, setToken] = useState(null);
  const [flag, setFlag] = useState(false);
  const saveGroup = api.getGroup();
  const [prevFavoritesLength, setPrevFavoritesLength] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const debounceSearchQuery = useDebounce(searchQuery, 300);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(9);
  const [total, setTotal] = useState(9);
  const [userInfo, setUserInfo] = useState("");
  const [crateId, setСrateId] = useState("");
  const [timeCards, setTimeCards] = useState(null);

  const openAvatarContent = () => {
    setContent(
      <div>{<Modal_avatar close={close} openBackForm={openBackForm} />}</div>
    );
    setModalActive(true);
  };

  const openFormContent = () => {
    setContent(
      <div>{<Modale_form close={close} openBackForm={openBackForm} />}</div>
    );
    setModalActive(true);
  };

  const [content, setContent] = useState(
    <div>
      {
        <Modale_content
          close={() => setModalActive(false)}
          openFormContent={openFormContent}
          openAvatarContent={openAvatarContent}
        />
      }
    </div>
  );

  const close = () => {
    setModalActive(false);
    setTimeout(() => {
      setContent(
        <div>
          {
            <Modale_content
              close={() => setModalActive(false)}
              openFormContent={openFormContent}
              openAvatarContent={openAvatarContent}
            />
          }
        </div>
      );
    }, 500);
  };

  const openBackForm = () => {
    setContent(
      <div>
        {
          <Modale_content
            close={() => setModalActive(false)}
            openFormContent={openFormContent}
            openAvatarContent={openAvatarContent}
          />
        }
      </div>
    );
    setModalActive(true);
  };

  const openNewPostContent = () => {
    setContent(<div>{<Modale_post close={close} />}</div>);
    setModalActive(true);
  };

  const openEditPostContent = (postId) => {
    setContent(<div>{<Modale_EditPost postId={postId} close={close} />}</div>);
    setModalActive(true);
  };

  const delPostContent = (postId) => {
    setContent(<div>{<Modale_question postId={postId} close={close} />}</div>);
    setModalActive(true);
  };

  const handleRequest = () => {
    setIsLoading(true);
    api
      .search(searchQuery, page, rowsPerPage)
      .then((searchResult) => {
        setCards(searchResult.posts);
        setTotal(searchResult.total);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (token && searchQuery) {
      handleRequest();
    }
  }, [searchQuery, token, page, rowsPerPage]);

  useEffect(() => {
    if (favorites.length > prevFavoritesLength) {
      setAddSnack(true);
    } else if (favorites.length < prevFavoritesLength) {
      setDelSnack(true);
    }
    setPrevFavoritesLength(favorites.length);
  }, [favorites]);

  const groupSave = localStorage.getItem("group");

  const refresh = useCallback(() => {
    api.setGroup(groupSave);
  }, [groupSave]);

  const user = useSelector((state) => state.registration.user);
  const tokenFromLS = localStorage.getItem("token");

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Проверяем,если в localStorage token

  useEffect(() => {
    if (tokenFromLS && !saveGroup) {
      api.setToken(tokenFromLS);
      setToken(tokenFromLS);
      refresh();
    }
  }, [saveGroup, tokenFromLS]);

  useEffect(() => {
    if (tokenFromLS) {
      try {
        setIsLoading(true);
        Promise.all([
          // api.getPostsListPaginationSearch(page, limit),
          api.getPostsList(),
          api.getUserInfo(),
        ])
          .then(([productsData, userData]) => {
            setCurrentUser(userData);
            setCards(productsData);
            setTimeCards(productsData);
            const favoriteProducts = productsData.filter((item) =>
              isLiked(item.likes, userData._id)
            );
            setFavorites(favoriteProducts);
          })
          .catch((err) => console.log(err.message))
          .finally(() => {
            setIsLoading(false);
          });
      } catch (error) {
        console.log(error.message);
      }
    }
  }, [user, token, saveGroup, flag]);

  useEffect(() => {
    if (!user && tokenFromLS) {
      api.getUserInfo().then((user) => {
        dispatch(setIsUserContent(user));
      });
    }
  }, [user]);

  const handleFormSubmit = useCallback(
    (inputText) => {
      navigate("/post");
      setSearchQuery(inputText);
      handleRequest();
    },
    [navigate, setSearchQuery, handleRequest]
  );

  const handleInputChange = useCallback(
    (inputValue) => {
      setSearchQuery(inputValue);
    },
    [setSearchQuery]
  );

  // function handleUpdateUser(userUpdateData) {
  //   api.setUserInfo(userUpdateData).then((newUserData) => {
  //     setCurrentUser(newUserData);
  //   });
  // }

  const handlePostLike = useCallback(
    (post) => {
      const liked = isLiked(post.likes, currentUser._id);
      return api.changeLikePost(post._id, liked).then((updateCard) => {
        const newPost = cards.map((cardState) => {
          return cardState._id === updateCard._id ? updateCard : cardState;
        });

        if (!liked) {
          setFavorites((prevState) => [...prevState, updateCard]);
        } else {
          setFavorites((prevState) =>
            prevState.filter((card) => card._id !== updateCard._id)
          );
        }

        setCards(newPost);
        return updateCard;
      });
    },
    [currentUser, cards]
  );

  const exit = useCallback(() => {
    localStorage.clear();
    setToken("");
  }, [setToken]);

  return (
    <Box
      sx={{
        position: modalActive ? "fixed" : "relative",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 5,
        overflow: "hidden",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <SortContext.Provider value={{ selectedTabId, setSelectedTabId }}>
        <UserContext.Provider
          value={{
            user: currentUser,
            isLoading,
            token,
            setToken,
            flag,
            setFlag,
            resetEmail,
            setResetEmail,
            setResetModalActive,
            resetModalActive,
            crateId,
            setСrateId,
            userInfo,
            setUserInfo,
          }}
        >
          <CardContext.Provider
            value={{
              cards,
              setCards,
              favorites,
              handleLike: handlePostLike,
              close,
              openNewPostContent,
              modalActive,
              delPostContent,
              openEditPostContent,
              favorites,
              searchQuery,
              setSearchQuery,
              page,
              setPage,
              rowsPerPage,
              setRowsPerPage,
              total,
              setTotal,
              handleInputChange,
              timeCards,
              setTimeCards,
              searchQuery,
            }}
          >
            <CssBaseline />
            <Box
              sx={{
                minHeight: "100vh",
                position: "relative",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Header
                setModalActive={setModalActive}
                token={token}
                exit={exit}
                refresh={setFlag}
                flag={flag}
              >
                <Routes>
                  <Route
                    path="/post"
                    element={
                      <Search
                        onSubmit={handleFormSubmit}
                        onInput={handleInputChange}
                      />
                    }
                  />
                </Routes>
              </Header>
              <Container
                sx={{ mt: "6rem", flex: "1 1 auto", position: "relative" }}
              >
                <SeachInfo searchText={searchQuery} />
                <TransitionGroup>
                  <CSSTransition
                    key={location.key}
                    classNames="fade"
                    timeout={300}
                    style={{ position: "absolute", width: "100%" }}
                  >
                    <Routes location={location}>
                      <Route exact path="/post" element={<IndexPage />} />
                      <Route
                        exact
                        path="/post/post/:postId"
                        element={<PostPage token={token} />}
                      />
                      <Route exact path="/post/faq" element={<FaqPage />} />
                      <Route exact path="/post/login" element={<LoginPage />} />
                      <Route
                        exact
                        path="/post/register"
                        element={<RegisterPage />}
                      />
                      <Route
                        exact
                        path="/post/resetPassword"
                        element={<ResetPage />}
                      />
                      <Route
                        path="/post/favorites"
                        element={<FavoritePage />}
                        exact
                      />
                      <Route
                        path="/post/created"
                        element={<CreatedPostsPage />}
                        exact
                      />
                      <Route exact path="*" element={<NotFoundPage />} />
                    </Routes>
                  </CSSTransition>
                </TransitionGroup>
              </Container>
              <Footer />
              <Modal active={modalActive} close={close}>
                {token && content}
              </Modal>
              <Modal
                active={resetModalActive}
                close={() => setResetModalActive(false)}
              >
                <Modale_password close={() => setResetModalActive(false)} />
              </Modal>
              <Snack
                isOpen={snackAdd}
                text={"Пост добавлен в избранное"}
                severity="success"
                handleClose={() => setAddSnack(false)}
              />
              <Snack
                isOpen={snackDel}
                text={"Пост Удалён из избранного"}
                severity="warning"
                handleClose={() => setDelSnack(false)}
              />
            </Box>
            <div className="bg"></div>
          </CardContext.Provider>
        </UserContext.Provider>
      </SortContext.Provider>
    </Box>
  );
}

export default App;
