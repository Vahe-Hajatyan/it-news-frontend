import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegistration, selectIsAuth } from "../../redux/slices/auth";
import axios from "../../axios";

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const [avatarUrl, setAvatarUrl] = React.useState("");
  const inputRef = React.useRef(null);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    node: "onChange",
  });

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      setAvatarUrl(data.url);
    } catch (err) {
      console.warn(err);
      alert("Ошибка при загрузке файла");
    }
  };
  const onSubmit = async (values) => {
    const filed = { ...values, avatarUrl };
    const data = await dispatch(fetchRegistration(filed));

    if (!data.payload) {
      alert("Не удалось регистрироваться");
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };
  if (isAuth) {
    return <Navigate to={"/"} />;
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.avatar}>
          {!avatarUrl ? (
            <Avatar
              onClick={() => inputRef.current.click()}
              className={styles.avatarCursor}
              sx={{ width: 100, height: 100 }}
            />
          ) : (
            <img
              onClick={() => inputRef.current.click()}
              className={styles.userAvatar}
              src={
                avatarUrl
                  ? `${
                      !process.env.REACT_APP_API_URL
                        ? "http://localhost:4444"
                        : process.env.REACT_APP_API_URL
                    }${avatarUrl}`
                  : ""
              }
              alt="Uploaded"
            />
          )}
        </div>
        <input ref={inputRef} type="file" onChange={handleChangeFile} hidden />
        <p className={styles.p}>выберите аватарку</p>
        <TextField
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register("fullName", { required: "Укажите полное имя" })}
          className={styles.field}
          label="Полное имя"
          fullWidth
        />
        <TextField
          type="email"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", { required: "Укажите email" })}
          className={styles.field}
          label="E-Mail"
          fullWidth
        />
        <TextField
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register("password", { required: "Укажите пароль" })}
          className={styles.field}
          label="Пароль"
          fullWidth
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
