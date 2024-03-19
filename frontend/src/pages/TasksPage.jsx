import { useEffect } from "react";
import { useTasks } from "../context/TasksContext";

function TasksPage () {
  const { getTasks, tasks } = useTasks();

  /*
  useEffect(() => {
    getTasks();
  }
  , []);

  if (tasks.length === 0) return (<p>No tasks</p>);
*/

  return <div>
    <h1>Tasks</h1>
  </div>
}

export default TasksPage;