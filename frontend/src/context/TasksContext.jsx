import { createContext, useContext, useState } from "react";
import { createTaskRequest } from "../api/tasks";

const TasksContext = createContext();

export const useTasks = () => {
    const context = useContext(TasksContext);
    if (!context) throw new Error('useTasks must be used within a TasksProvider');
    return context;
}

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState([]);

    const getTasks = async () => {
        try {
            const res = await axios.get('/tasks');
            setTasks(res.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setErrors(error.response.data);
            setLoading(false);
        }
    }

    const createTask = async (task) => {
        try {
            const res = await axios.post('/tasks', task);
            setTasks([...tasks, res.data]);
        } catch (error) {
            console.log(error);
            setErrors(error.response.data);
        }
    }

    const deleteTask = async (id) => {
        try {
            await axios.delete(`/tasks/${id}`);
            setTasks(tasks.filter(task => task.id !== id));
        } catch (error) {
            console.log(error);
            setErrors(error.response.data);
        }
    }

    const updateTask = async (id, task) => {
        try {
            const res = await axios.put(`/tasks/${id}`, task);
            setTasks(tasks.map(task => task.id === id ? res.data : task));
        } catch (error) {
            console.log(error);
            setErrors(error.response.data);
        }
    }
    return (
        <TasksContext.Provider value={{ tasks, loading, errors, createTask, deleteTask, updateTask }}>
            {children}
        </TasksContext.Provider>
    )
}