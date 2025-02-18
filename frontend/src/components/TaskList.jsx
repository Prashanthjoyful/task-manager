import TaskItem from "./TaskItem";

const TaskList = ({ tasks, fetchTasks }) => {
  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} fetchTasks={fetchTasks} />
      ))}
    </ul>
  );
};

export default TaskList;
