import { useState, useEffect } from "react"
import ToDoItem from './ToDoItem'
import { useAuth } from "@clerk/nextjs";
import Loading from '../components/Loading.js'
import { getUndoneTodoItems, getDoneTodoItems, addTodoItem } from "@/modules/Data";

export default function ToDoList(props){
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const [newName, setNewName] = useState("");

    useEffect(() => {
      async function process() {
        if (userId) {
          const token = await getToken({ template: "codehooks" });
          if(props.done){
            //only get done todo items
            setTodos(await getDoneTodoItems(token, userId));
            setLoading(false);
          } else {
            //only get undone todo items
            setTodos(await getUndoneTodoItems(token, userId));
            setLoading(false);
          }
          
          setLoading(false);
        }
      }
      process();
    }, [isLoaded]);

    async function add() {
        const token = await getToken({ template: "codehooks" });
        const done = false;
        const createdOn = new Date()
        const newTodo = await addTodoItem(token, userId, newName, done, createdOn);
        setNewName("");
        setTodos([newTodo].concat(todos));
    }


    if (loading) {
    return <Loading/>
    } else {
    const todoListItems = todos.map((element) => {
        return <li><ToDoItem key={element._id} todo={element}/></li>
    });
        //done page, no add new task input
        if(props.done){
            return (
                <>
                <ol className="todoList-ol">
                    {todoListItems}
                </ol>
                </>
            );
        //todo page, include add new task input
        } else {
            return (
                <>
                <ol className="todoList-ol">
                    <div className="todoList-add-container">
                        <input
                        class="todoList-add-input"
                        placeholder="Add a new task!"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        onKeyDown = {(e)=>{if (e.key === 'Enter'){add()}}}
                        ></input>
                        <button className="todoList-add-button" onClick={add}>Add +</button>
                    </div>
                    {todoListItems}
                </ol>
                </>
            );
        }
    }
}