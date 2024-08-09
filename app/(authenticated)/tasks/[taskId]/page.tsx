export default function Page({ params }: { params: { taskId: string } }) {
  return <div>Task {params.taskId}</div>;
}
