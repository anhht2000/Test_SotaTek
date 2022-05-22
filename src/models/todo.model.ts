export interface Todo {
  id?: string;
  name: string;
  description?: string;
  date: string;
  priority: "low" | "normal" | "hight";
  isDone: boolean;
  isShow?: boolean;
}
