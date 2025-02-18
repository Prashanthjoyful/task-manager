import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/tasks";

const TaskForm = ({ fetchTasks }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;
    try {
      await axios.post(API_URL, { title });
      setTitle("");
      fetchTasks();
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 bg-gray-50 p-4 rounded-lg shadow-md"
    >
      <input
        type="text"
        placeholder="Enter a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-grow border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
      >
        Add
      </button>
    </form>
  );
};

export default TaskForm;
