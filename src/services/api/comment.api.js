import axiosInstance from "./axiosInstance.js";

export const createComment = (postId,comment) => {
  return axiosInstance.post(`posts/${postId}/comments`, comment);
};

export const getComments = (postId) => {
  return axiosInstance.get(`/posts/${postId}/comments`);
};

export const deleteComment = (postId,commentId) => {
  return axiosInstance.delete(`posts/${postId}/comments/${commentId}`);
};

export const updateComment = (postId,commentId,content) => {
  return axiosInstance.put(`posts/${postId}/comments/${commentId}`,{ content });
};



