import { TaskCard } from "@/app/components/TaskCard";
import { TaskHeader } from "@/app/components/TaskHeader";
import React from "react";

export default async function TodosPage() {
  return (
    <React.Fragment>
      <TaskHeader />
      <div className="grid xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4 mb-4">
        {[...new Array(100)].map((_item, index) => (
          <TaskCard
            key={index}
            taskId={`${index}`}
            title={"Noteworthy technology acquisitions 2021"}
            description={
              "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order."
            }
          />
        ))}
      </div>
    </React.Fragment>
  );
}
