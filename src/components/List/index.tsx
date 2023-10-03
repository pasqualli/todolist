import styles from "./List.module.css";

import {
  faCheck,
  faTrash,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ITodo } from "../../pages/Home";
import {
  ChangeEvent,
  ForwardRefRenderFunction,
  createRef,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from "react";

interface IProps {
  todos: ITodo[];
  deleteTodo: (id: string) => void;
  completeTodo: (id: string) => void;
  editTodo: (event: ChangeEvent<HTMLInputElement>, id: string) => void;
}

interface IListRef {
  focus: (index: number) => void;
}

const ListBase: ForwardRefRenderFunction<IListRef, IProps> = (
  { todos, completeTodo, deleteTodo, editTodo },
  ref
) => {
  const inputRefs = useMemo(
    () =>
      Array(todos.length)
        .fill(0)
        .map(() => createRef<HTMLInputElement>()),
    [todos.length]
  );

  //permite que o filho exporte funções para o pai
  useImperativeHandle(ref, () => ({
    focus: (index: number) => {
      inputRefs[index].current?.focus();
    },
  }));
  const handleTodoBlur = (index: number) => {
    inputRefs[index].current?.focus();
  };
  return (
    <>
      {todos.map((todo, index) => {
        return (
          <div className={styles.card} key={index}>
            {todo.completed ? (
              <input
                type="text"
                value={todo.description}
                className={styles.inputCompleted}
              />
            ) : (
              <>
                <input
                  type="text"
                  value={todo.description}
                  ref={inputRefs[index]}
                  onChange={(e) => editTodo(e, todo.id)}
                />
                <div className={styles.icon}>
                  <span>
                    <FontAwesomeIcon
                      icon={faCheck}
                      color="#2ff806"
                      size="1x"
                      onClick={() => completeTodo(todo.id)}
                    />
                  </span>
                  <span>
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      color="#f1e20c"
                      size="1x"
                      onClick={() => {
                        handleTodoBlur(index);
                      }}
                    />
                  </span>
                  <span>
                    <FontAwesomeIcon
                      icon={faTrash}
                      color="#f30707"
                      size="1x"
                      onClick={() => deleteTodo(todo.id)}
                    />
                  </span>
                </div>
              </>
            )}
          </div>
        );
      })}
    </>
  );
};

export const List = forwardRef(ListBase);

