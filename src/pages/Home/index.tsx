import { useState } from 'react';
import { Header } from '../../components/Header';
import { List } from '../../components/List';
import styles from './Home.module.css';
import {v4 as uuid} from 'uuid';

export interface ITodo {
    id: string;
    description: string;
    completed: boolean
}

export const Home = ()=> {

    const [todo, setTodo] = useState<string>('');
    const [todos, setTodos] = useState<ITodo[]>([]);

    const addTodo = ()=> {
        const newTodo = {
            id: uuid(), description:todo, completed: false 
        }
        setTodos([...todos,newTodo ]);
        setTodo('');
    }

    const deleteTodo = (id:string)=> {
        const filterTodos = todos.filter(todo=> todo.id!== id)
        setTodos(filterTodos);
    }
    const completeTodo = (id:string)=> {
        const newTodosState = todos.filter((todo)=> {
            if(todo.id ===id){
                return {...todo, completed: !todo.completed}
            }else{
                return todo;
            }
        })
        setTodos(newTodosState);
    }

    return (
        <div >
           <Header/>
           <div className={styles.createTask}>
            <input type="text" onChange={(e)=>setTodo(e.target.value)} value={todo} />
            <button onClick={addTodo}>Adicionar</button>
           </div>
           <div className={styles.filter}>
            <span className={styles.completed}>Finalizados: 5 tarefas</span>
            <span className={styles.pending}>Em progresso: 5 tarefas</span>
           </div>

           <List todos={todos} deleteTodo={deleteTodo} completeTodo={completeTodo}/>
        </div>
    )
}