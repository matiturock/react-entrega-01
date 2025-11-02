interface TasksCountProps {
  total: number;
  completed: number;
}

export default function Summary(props: TasksCountProps) {
  const { total, completed } = props;

  return (
    <div>
      <p>
        <strong>
          Resume: {completed}/{total}
        </strong>
      </p>
    </div>
  );
}
