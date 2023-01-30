import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getPosts = createAsyncThunk("getPosts", async (_, thunkAPI) => {
  axios
    .get("http://localhost:5000/post/")
    .then((res) => thunkAPI.dispatch(getPostsSuccess(res.data)));
});

export const postSlice = createSlice({
  name: "post",
  initialState: { postData: [] },
  reducers: {
    getPostsSuccess: (state, { payload }) => {
      state.postData = payload;
    },
    createPost: (state, { payload }) => {
      state.postData.push(payload);
    },
    editPost: (state, { payload }) => {
      state.postData = state.postData.map((el) => {
        if (el._id === payload[1]) {
          return {
            ...el,
            message: payload[0],
          };
        } else {
          return el;
        }
      });
    },
    deletePost: (state, { payload }) => {
      state.postData = state.postData.filter((el) => el._id !== payload);
    },
    like: (state, { payload }) => {
      state.postData = state.postData.map((post) => {
        if (post._id === payload[1]) {
          return {
            ...post,
            likers: [...post.likers, payload[0]],
          };
        } else {
          return post;
        }
      });
    },
    dislike: (state, { payload }) => {
      state.postData = state.postData.map((post) => {
        if (post._id === payload[1]) {
          return {
            ...post,
            likers: post.likers.filter((userId) => userId !== payload[0]),
          };
        } else {
          return post;
        }
      });
    },
  },
});

export const {
  getPostsSuccess,
  createPost,
  editPost,
  deletePost,
  like,
  dislike,
} = postSlice.actions;
export default postSlice.reducer;
