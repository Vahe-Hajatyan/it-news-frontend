import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Post } from "../components/Post";
import Grid from "@mui/material/Grid";
import { fetchTagsPosts } from "../redux/slices/posts";
import React from "react";

export const TagsPost = () => {
  const { name } = useParams();

  const userData = useSelector((state) => state.auth.data);

  const { tagsPosts } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchTagsPosts(name));
  }, [name]);

  const isPostsLoading = tagsPosts.status === "loading";
  return (
    <>
      <h1 style={{ color: "#565252" }}>#{name}</h1>
      <Grid xs={8} item>
        {(isPostsLoading ? [...Array(10)] : tagsPosts.items).map((obj, index) =>
          isPostsLoading ? (
            <Post key={index} isLoading={true} imageUrl={null} />
          ) : (
            <Post
              key={index}
              id={obj._id}
              title={obj.title}
              imageUrl={
                obj.imageUrl
                  ? `${
                      process.env.REACT_APP_API_URL || "http://localhost:4444"
                    }${obj.imageUrl}`
                  : ""
              }
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={3}
              tags={obj.tags}
              isEditable={userData?._id === obj.user?._id}
            />
          )
        )}
      </Grid>
    </>
  );
};
