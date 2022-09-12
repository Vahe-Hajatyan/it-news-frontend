import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts");
  return data;
});
export const fetchPopularPosts = createAsyncThunk(
  "posts/fetchPopularPosts",
  async () => {
    const { data } = await axios.get("/popular");
    return data;
  }
);
export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});
export const fetchTagsPosts = createAsyncThunk(
  "posts/fetchTagsPosts",
  async (name) => {
    const { data } = await axios.get(`/tags/${name}`);
    return data;
  }
);
export const fetchRemovePosts = createAsyncThunk(
  "posts/fetchRemovePosts",
  (id) => axios.delete(`/posts/${id}`)
);
export const fetchComment = createAsyncThunk(
  "posts/fetchComment",
  async (obj) => {
    const { data } = await axios.post(`/comment/${obj.id}`, obj.filed);
    return data;
  }
);
export const fetchOnePost = createAsyncThunk(
  "posts/fetchOnePost",
  async (id) => {
    const { data } = await axios.get(`/posts/${id}`);
    return data;
  }
);
export const fetchToggleTrue = createAsyncThunk("posts/fetchToggleTrue");
export const fetchToggleFalse = createAsyncThunk("posts/fetchToggleFalse");
export const fetchWidth = createAsyncThunk("posts/fetchWidth");

const initialState = {
  toggle: false,
  width: null,
  comment: {
    items: {},
    status: "loading",
  },
  posts: {
    items: {},
    status: "loading",
  },
  tags: {
    items: {},
    status: "loading",
  },
  tagsPosts: {
    items: {},
    status: "loading",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducer: {},
  extraReducers: {
    // posts
    [fetchPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
      state.width = window.screen.width;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    // popular
    [fetchPopularPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchPopularPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPopularPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "loading";
      state.width = window.screen.width;
    },
    // comment
    [fetchComment.pending]: (state) => {
      state.comment.status = "loading";
    },
    [fetchComment.fulfilled]: (state, action) => {
      state.comment.items = action.payload;
      state.comment.status = "loaded";
    },
    [fetchComment.rejected]: (state) => {
      state.comment.items = [];
      state.comment.status = "loading";
    },
    //onePost
    [fetchOnePost.pending]: (state) => {
      state.comment.items = [];
      state.comment.status = "loading";
    },
    [fetchOnePost.fulfilled]: (state, action) => {
      state.comment.items = action.payload;
      state.comment.status = "loaded";
    },
    [fetchOnePost.rejected]: (state) => {
      state.comment.items = [];
      state.comment.status = "loading";
    },
    // tags
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = "loading";
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = "loading";
    },
    // tagsPosts
    [fetchTagsPosts.pending]: (state) => {
      state.tagsPosts.items = [];
      state.tagsPosts.status = "loading";
    },
    [fetchTagsPosts.fulfilled]: (state, action) => {
      state.tagsPosts.items = action.payload;
      state.tagsPosts.status = "loaded";
    },
    [fetchTagsPosts.rejected]: (state) => {
      state.tagsPosts.items = [];
      state.tagsPosts.status = "loading";
    },
    // delete
    [fetchRemovePosts.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (obj) => obj._id !== action.meta.arg
      );
    },
    [fetchRemovePosts.fulfilled]: (state, action) => {
      state.tagsPosts.items = state.tagsPosts.items.filter(
        (obj) => obj._id !== action.meta.arg
      );
    },
    // toggle true
    [fetchToggleTrue.pending]: (state) => {
      state.toggle = true;
    },
    // toggle false
    [fetchToggleFalse.pending]: (state) => {
      state.toggle = false;
    },
    // width
    [fetchWidth.pending]: (state) => {
      state.width = window.screen.width;
      state.toggle = null;
    },
  },
});

export const postsReducer = postsSlice.reducer;
