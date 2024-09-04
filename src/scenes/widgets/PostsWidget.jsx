import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state"; // Assuming you have a state management setup

import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false, setDelete, Delete, reloadPost }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Initialize loading state
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    try {
      const response = await fetch("https://social-mernback-1.onrender.com/posts", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      dispatch(setPosts({ posts: sortedData }));
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false); // Handle error by setting loading to false
    }
  };

  const getUserPosts = async () => {
    try {
      const response = await fetch(`https://social-mernback-1.onrender.com/posts/${userId}/posts`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      dispatch(setPosts({ posts: sortedData }));
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching user posts:", error);
      setLoading(false); // Handle error by setting loading to false
    }
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, [Delete, reloadPost]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        posts.map(({ _id, userId, firstName, lastName, description, location, picturePath, userPicturePath, likes, comments }) => (
          <PostWidget
            key={_id}
            postId={_id}
            commentId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
            isProfile={isProfile}
            userId={userId}
            setDelete={setDelete}
          />
        ))
      )}
    </div>
  );
};

export default PostsWidget;
