import axiosInstance from "./axiosInstance";

export const signUp = (formData) => {
  return axiosInstance.post("/users/signup", formData);
};
export const signIn = (formData) => {
  return axiosInstance.post("/users/signin", formData);
};
