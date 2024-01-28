/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";

const TaskContext = createContext();

const initialState = {
  tasks: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "DELETE_ALL_TASKS":
      return {
        ...state,
        tasks: [],
      };
    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addTask = (task) => {
    dispatch({ type: "ADD_TASK", payload: task });
  };

  const deleteTask = (taskId) => {
    dispatch({ type: "DELETE_TASK", payload: taskId });
  };

  const deleteAllTasks = () => {
    dispatch({ type: "DELETE_ALL_TASKS" });
  };

  return (
    <TaskContext.Provider
      value={{ tasks: state.tasks, addTask, deleteTask, deleteAllTasks }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  return useContext(TaskContext);
};
