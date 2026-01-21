import axiosInstance from "./axiosInstance";

export const getProfile = () => {
  return axiosInstance.get(`/users/profile-data`);
};

export const updatePhoto = (photo) => {
  return axiosInstance.put(`/users/upload-photo`, photo);
};

export const changePassword = (password) => {
  return axiosInstance.patch(`/users/change-password`, password);
};

export const getMyPosts = (userId) => {
  return axiosInstance.get(`/users/${userId}/posts`);
};
