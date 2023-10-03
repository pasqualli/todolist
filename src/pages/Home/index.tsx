import { ChangeEvent, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { List } from "../../components/List";
import styles from "./Home.module.css";
import { v4 as uuid } from "uuid";

export interface ITodo {
  id: string;
  description: string;
  completed: boolean;
}

export const Home = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<ITodo[]>([]);

  const [totalInProgress, setTotalInProgress] = useState(0);
  const [totalCompleted, setTotalCompleted] = useState(0);

  useEffect(() => {
    const newTotalInProgress = todos.reduce(
      (prev, current) => (!current.completed ? prev + 1 : prev),
      0
    );
    setTotalInProgress(newTotalInProgress);

    const newTotalCompleted = todos.reduce(
      (prev, current) => (current.completed ? prev + 1 : prev),
      0
    );
    setTotalCompleted(newTotalCompleted);
  }, [todos]);

  const addTodo = () => {
    const newTodo = {
      id: uuid(),
      description: todo,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setTodo("");
  };

  const deleteTodo = (id: string) => {
    const filterTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filterTodos);
  };
  const completeTodo = (id: string) => {
    const newTodosState = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      } else {
        return todo;
      }
    });
    setTodos(newTodosState);
  };

  const editTodo = (event: ChangeEvent<HTMLInputElement>, id: string) => {
    const newTodosState = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, description: event.target.value };
      } else {
        return todo;
      }
    });
    setTodos(newTodosState);
  };

  return (
    <div>
      <Header />
      <div className={styles.createTask}>
        <input
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button onClick={addTodo}>Adicionar</button>
      </div>
      <div className={styles.filter}>
        <span className={styles.completed}>
          Finalizados: {totalCompleted} tarefa(s)
        </span>
        <span className={styles.pending}>
          Em progresso: {totalInProgress} tarefa(s)
        </span>
      </div>

      <List
        todos={todos}
        deleteTodo={deleteTodo}
        completeTodo={completeTodo}
        editTodo={editTodo}
      />
    </div>
  );
};
