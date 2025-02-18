import axios from "axios";
import { useState } from "react";

const API_URL = "http://localhost:5000/tasks";

const TaskItem = ({ task, fetchTasks }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${task._id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}/${task._id}`, { title: newTitle });
      setIsEditing(false);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  return (
    <li className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-md">
      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="flex-grow border border-gray-300 p-2 rounded-lg"
        />
      ) : (
        <span className="text-lg font-medium">{task.title}</span>
      )}
      <div className="flex gap-2">
        {isEditing ? (
          <button
            onClick={handleUpdate}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg transition"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg transition"
          >
            Edit
          </button>
        )}
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
