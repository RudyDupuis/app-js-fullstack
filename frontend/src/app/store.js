import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../feature/post.slice";
import userReducer from "../feature/user.slice";

export default configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
  },
});
