import axiosInstance from "./axiosInstance";

export const getAllPosts = () => {
  return axiosInstance.get(`/posts?limit=50&sort=-createdAt`);
};

export const getSinglePosts = (postId) => {
  return axiosInstance.get(`/posts/${postId}`);
};

export const createPost = (formData) => {
  return axiosInstance.post(`/posts`, formData);
};

export const updatePost = (postId, formData) => {
  return axiosInstance.put(`/posts/${postId}`, formData);
};

export const deletePost = (postId) => {
  return axiosInstance.delete(`/posts/${postId}`);
};
