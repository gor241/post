import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async ({ email, group, password }) => {
    const data = await api.signUp(email, group, password);
    return data;
  }
);
export const signInUser = createAsyncThunk(
  "auth/signInUser",
  async ({ email, password }) => {
    const data = await api.signIn(email, password);
    return data;
  }
);
export const changePassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ password, token }) => {
    const data = await api.changePassword(password, token);
    return data;
  }
);

export const setUserInfo = createAsyncThunk(
  "auth/setUserInfo",
  async (dataUser) => {
    const response = await api.setUserInfo(dataUser);
    return response;
  }
);

export const setUserAvatar = createAsyncThunk(
  "auth/setUserAvatar",
  async (avatar) => {
    const response = await api.setUserAvatar(avatar);
    return response;
  }
);

// создаём Slice это будет макетом редюсера со всем что нам нужно
const registrationkitSlice = createSlice({
  name: "Registration", // имя любое
  initialState: {
    // значения по умолчанию
    user: null,
    isLoading: null,
    error: null,
    isCheckModal: false,
    token: null,
    reset:null
  },
  reducers: {
    // сам редюсер , в более понятной форме
    setIsCheckModal(state) {
      state.isCheckModal = false;
    },
    setIsUserContent(state, action) {
      state.user = action.payload;
    },
    delUserContent(state) {
      state.user = null;
      state.token = null;
      state.reset= null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(signUpUser.rejected, (state) => {
        state.isLoading = false;
        state.error = "Ошибка сервера";
      })
      .addCase(signInUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.token = action.payload.token;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(signInUser.rejected, (state) => {
        state.isLoading = false;
        state.error = "Ошибка сервера";
      })
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.reset = action.payload.token;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(changePassword.rejected, (state) => {
        state.isLoading = false;
        state.error = "Ошибка сервера";
      })
      .addCase(setUserInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(setUserInfo.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(setUserInfo.rejected, (state) => {
        state.isLoading = false;
        state.error = "Ошибка сервера";
      })
      .addCase(setUserAvatar.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(setUserAvatar.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(setUserAvatar.rejected, (state) => {
        state.isLoading = false;
        state.error = "Ошибка сервера";
      });
  },
});

export default registrationkitSlice.reducer;
export const { setIsCheckModal, setIsUserContent, delUserContent } =
  registrationkitSlice.actions;
