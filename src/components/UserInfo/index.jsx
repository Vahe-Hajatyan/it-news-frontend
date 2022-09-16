import { Avatar } from "@mui/material";
import React from "react";
import styles from "./UserInfo.module.scss";

export const UserInfo = ({ avatarUrl, fullName, additionalText }) => {
  return (
    <div className={styles.root}>
      <Avatar
        className={styles.avatar}
        src={
          avatarUrl
            ? `${
                !process.env.REACT_APP_API_URL
                  ? "http://localhost:4444"
                  : process.env.REACT_APP_API_URL
              }${avatarUrl}`
            : ""
        }
        alt={fullName}
      />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
