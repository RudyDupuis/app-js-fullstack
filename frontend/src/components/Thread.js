import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../feature/post.slice";
import Post from "./Post";

const Thread = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.postData);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <div className="thread-container">
      {posts &&
        posts
          .slice()
          .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
          .map((post, index) => <Post key={index} post={post} />)}
    </div>
  );
};

export default Thread;
