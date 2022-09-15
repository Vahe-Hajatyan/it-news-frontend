import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { SideBlock } from "../SideBlock";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchComment } from "../../redux/slices/posts";

export const Index = ({ id }) => {
  const userData = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
  const [comment, setComment] = React.useState("");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      text: "",
    },
    node: "onChange",
  });

  const onSubmit = () => {
    try {
      const user = userData;
      const filed = {
        user,
        comment,
      };
      const obj = {
        filed,
        id,
      };
      if (obj.filed.comment !== "") {
        dispatch(fetchComment(obj));
      }
      setComment("");
    } catch (err) {
      console.warn(err);
      alert("Ошибка при создании комментарии");
    }
  };
  if (!userData) {
    return <Navigate to={"/login"} />;
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SideBlock>
        <div className={styles.root}>
          <Avatar
            classes={{ root: styles.avatar }}
            src={
              userData.avatarUrl
                ? `${process.env.REACT_APP_API_URL || "http://localhost:4444"}${
                    userData.avatarUrl
                  }`
                : ""
            }
          />
          <div className={styles.form}>
            <TextField
              label="Написать комментарий"
              {...register("text", { required: "Укажите комментарию" })}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              variant="outlined"
              maxRows={10}
              multiline
              fullWidth
            />
            <Button type="submit" variant="contained">
              Отправить
            </Button>
          </div>
        </div>
      </SideBlock>
    </form>
  );
};
