import React from "react";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { fetchOnePost } from "../redux/slices/posts";

export const FullPost = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const { id } = useParams();
  const { comment } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  React.useEffect(() => {
    try {
      const fetch = async () => {
        const postData = await dispatch(fetchOnePost(id));
        if (postData) {
          setIsLoading(false);
        }
      };
      fetch();
    } catch (err) {
      console.warn(err);
      alert("ошибка при получении статьи");
    }
  }, []);
  if (isLoading) {
    return (
      <>
        <Post isLoading={isLoading} isFullPost />
        <CommentsBlock isLoading={isLoading} />
      </>
    );
  }
  return (
    <>
      <Post
        id={comment.items._id}
        title={comment.items.title}
        imageUrl={
          comment.items.imageUrl
            ? `${
                !process.env.REACT_APP_API_URL
                  ? "http://localhost:4444"
                  : process.env.REACT_APP_API_URL
              }${comment.items.imageUrl}`
            : ""
        }
        user={comment.items.user}
        createdAt={comment.items.createdAt}
        viewsCount={comment.items.viewsCount}
        commentsCount={comment.items.comment.length}
        tags={comment.items.tags}
        isFullPost
      >
        <ReactMarkdown children={comment.items.text} />
      </Post>
      {!comment.items.comment ? (
        ""
      ) : (
        <CommentsBlock items={comment.items.comment} isLoading={false} />
      )}
      <Index id={comment.items._id} />
    </>
  );
};
