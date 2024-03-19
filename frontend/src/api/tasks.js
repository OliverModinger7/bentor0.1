import axios from './axios';

export const getTasksRequest = async () => axios.get("/tasks");

export const createTaskRequest = (task) => axios.post("/tasks", task);

export const updateTaskRequest = async (task) => axios.put(`/tasks/${task._id}`, task);

export const deleteTaskRequest = (id) => axios.delete(`/tasks/${id}`);

export const getTaskRequest = async (id) => axios.get(`/tasks/${id}`);

//export const getProfileRequest = () => axios.get('/profile');

