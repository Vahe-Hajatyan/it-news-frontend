import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPopularPosts,
  fetchPosts,
  fetchTags,
  fetchToggleFalse,
  fetchToggleTrue,
  fetchWidth,
} from "../redux/slices/posts";

export const Home = () => {
  const dispatch = useDispatch();
  const { posts, tags, toggle, width } = useSelector((state) => state.posts);
  const userData = useSelector((state) => state.auth.data);
  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  const newPost = () => {
    dispatch(fetchToggleFalse());
    dispatch(fetchPosts());
  };
  const widthPage = () => {
    dispatch(fetchWidth());
  };

  const popularPosts = () => {
    dispatch(fetchToggleTrue());
    dispatch(fetchPopularPosts());
  };
  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={toggle !== null ? (toggle ? 1 : 0) : 2}
        aria-label="basic tabs example"
      >
        <Tab onClick={newPost} label="Все" />
        <Tab onClick={popularPosts} label="Популярные" />
        {width < 560 ? <Tab onClick={widthPage} label="Теги" /> : ""}
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {toggle !== null ? (
            toggle ? (
              (isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
                isPostsLoading ? (
                  <Post key={index} isLoading={true} />
                ) : (
                  <Post
                    key={index}
                    id={obj._id}
                    title={obj.title}
                    imageUrl={
                      obj.imageUrl
                        ? `${
                            !process.env.REACT_APP_API_URL
                              ? "http://localhost:4444"
                              : process.env.REACT_APP_API_URL
                          }${obj.imageUrl}`
                        : ""
                    }
                    user={obj.user}
                    createdAt={obj.createdAt}
                    viewsCount={obj.viewsCount}
                    commentsCount={obj.comment.length}
                    tags={obj.tags}
                    isAdmin={userData?.email === "admin@gmail.com"}
                    isEditable={
                      userData?.email === "admin@gmail.com"
                        ? true
                        : userData?._id === obj.user?._id
                    }
                  />
                )
              )
            ) : (
              (isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
                isPostsLoading ? (
                  <Post key={index} isLoading={true} />
                ) : (
                  <Post
                    key={index}
                    id={obj._id}
                    title={obj.title}
                    imageUrl={
                      obj.imageUrl
                        ? `${
                            !process.env.REACT_APP_API_URL
                              ? "http://localhost:4444"
                              : process.env.REACT_APP_API_URL
                          }${obj.imageUrl}`
                        : ""
                    }
                    user={obj.user}
                    createdAt={obj.createdAt}
                    viewsCount={obj.viewsCount}
                    commentsCount={obj.comment.length}
                    tags={obj.tags}
                    isAdmin={userData?.email === "admin@gmail.com"}
                    isEditable={
                      userData?.email === "admin@gmail.com"
                        ? true
                        : userData?._id === obj.user?._id
                    }
                  />
                )
              )
            )
          ) : (
            <div style={{ paddingLeft: 50, paddingBottom: 20 }}>
              <Grid xs={4} item>
                <TagsBlock items={tags.items} isLoading={isTagsLoading} />
              </Grid>
            </div>
          )}
        </Grid>
        {width < 560 ? (
          ""
        ) : (
          <Grid xs={4} item>
            <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          </Grid>
        )}
      </Grid>
    </>
  );
};
