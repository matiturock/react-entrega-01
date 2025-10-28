export interface Task {
  id: `${string}-${string}-${string}-${string}-${string}`;
  text: string;
  createdAt: Date;
  completed: boolean;
}
