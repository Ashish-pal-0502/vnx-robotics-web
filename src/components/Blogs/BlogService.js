
import apiClient from './../../api/client';

export const getBlogs = async () => {
  const response = await apiClient.get("/blog/get", {
    params: { page: 1, limit: 20 },
  });

  return response?.data?.data?.blogs || [];
};

export const createBlog = async (payload) => {
  return await apiClient.post("/blog/create", payload);
};

export const updateBlog = async (id, payload) => {
  return await apiClient.put(`/blog/update/${id}`, payload);
};

export const deleteBlog = async (id) => {
  return await apiClient.delete(`/blog/delete/${id}`);
};