import { createTask, getMyTask } from "@/app/actions/task";
import { TaskCard } from "@/app/components/TaskCard";
import { TaskHeader } from "@/app/components/TaskHeader";
import React from "react";

export default async function TodosPage() {
  const { data: tasks = [] } = await getMyTask();

  return (
    <React.Fragment>
      <TaskHeader onAddTask={createTask} />
      <div className="grid xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4 mb-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            taskId={task.id}
            title={task.title}
            description={task?.description || ""}
          />
        ))}
      </div>
    </React.Fragment>
  );
}
