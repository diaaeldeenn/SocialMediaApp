import axiosInstance from "./axiosInstance.js";

export const createComment = (comment) => {
  return axiosInstance.post("/comments", comment);
};

export const getComments = (postId) => {
  return axiosInstance.get(`/posts/${postId}/comments`);
};

export const deleteComment = (commentId) => {
  return axiosInstance.delete(`/comments/${commentId}`);
};

export const updateComment = (commentId,content) => {
  return axiosInstance.put(`/comments/${commentId}`,{ content });
};



