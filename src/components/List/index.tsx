import styles from "./List.module.css";

import {
  faCheck,
  faTrash,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ITodo } from "../../pages/Home";

interface IProps {
  todos: ITodo[];
  deleteTodo: (id: string) => void;
  completeTodo: (id: string) => void;
}

export const List = ({ todos, deleteTodo, completeTodo }: IProps) => {
  return (
    <>
      {todos.map((todo, index) => {
        
        return (
          <div className={styles.card} key={index}>
            <input type="text" value={todo.description} />
            <div className={styles.icon}>
              <span>
                <FontAwesomeIcon
                  icon={faCheck}
                  color="#660096"
                  size="1x"
                  onClick={() => completeTodo(todo.id)}
                />
              </span>
              <span>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  color="#660096"
                  size="1x"
                />
              </span>
              <span>
                <FontAwesomeIcon
                  icon={faTrash}
                  color="#660096"
                  size="1x"
                  onClick={() => deleteTodo(todo.id)}
                />
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
};
//<FontAwesomeIcon icon={faCheck} />
//<FontAwesomeIcon icon={faTrash} />
//<FontAwesomeIcon icon={faPenToSquare} />
