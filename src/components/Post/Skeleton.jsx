import React from "react";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

import styles from "./Post.module.scss";

export const PostSkeleton = ({ isFullPost }) => {
  return (
    <div className={isFullPost ? styles.fullPostsSkeleton : styles.skeleton}>
      <Stack spacing={1}>
        <span className={styles.skeletonImage} />
        <div className={styles.skeletonContent}>
          <div className={styles.skeletonUser}>
            <Skeleton
              variant="circular"
              width={40}
              height={40}
              style={{ marginRight: 10 }}
            />
            <div className={styles.skeletonUserDetails}>
              <Skeleton variant="text" width={60} height={20} />
              <Skeleton variant="text" width={100} height={15} />
            </div>
          </div>
          <div className={styles.skeletonInfo}>
            <Skeleton variant="text" width="80%" height={45} />
            <div className={styles.skeletonTags}>
              <Skeleton variant="text" width={40} height={30} />
              <Skeleton variant="text" width={40} height={30} />
              <Skeleton variant="text" width={40} height={30} />
            </div>
          </div>
        </div>
      </Stack>
    </div>
  );
};
