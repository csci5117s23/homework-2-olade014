import ToDoItem from '@/components/ToDoItem'
import { useState, useEffect } from "react"

import NavBar from '../../components/NavBar'
import Loading from '../../components/Loading'
import { useRouter } from "next/router";
import { useAuth } from "@clerk/nextjs";
import { updateTodo, getTodoItemById } from "@/modules/Data";

export default function Todo() {
    const router = useRouter();
    const {id} = router.query;

    const [todo, setTodo] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const [newName, setNewName] = useState("")
    const [done, setDone] = useState(false);
    const [createdOn, setCreatedOn] = useState(null)

    useEffect(() => {
      if(!userId){
        router.push('/')
      }
    });

    useEffect(() => {
      async function process() {
        if (userId) {
          const token = await getToken({ template: "codehooks" });
          const thisTodo = await getTodoItemById(token, id);
          if(thisTodo){
            setTodo(thisTodo);
            setNewName(thisTodo[0].name);
            setDone(thisTodo[0].done);
            setCreatedOn(thisTodo[0].createdOn);
          }
          
          setLoading(false);
        } 
      }
      process();
    }, [isLoaded]);

    async function edit() {
      const token = await getToken({ template: "codehooks" });
      const createdOn = new Date()
      const newTodo = await updateTodo(token, userId, newName, done, createdOn, id);
    }

    async function markDone() {
      setDone(!done);
      updateDone();
    }

    async function updateDone(){
      const token = await getToken({ template: "codehooks" });
      await updateTodo(token, userId, newName, !done, createdOn, id);
  }

    if (loading) {
      return <>
        <NavBar/>
        <Loading/>
      </>
      } else if (done) {
        return <>
          <NavBar/>
          <div className="todoId-edit-container">
            <textarea
            class="todoId-edit-input"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown = {(e)=>{if (e.key === 'Enter'){edit()}}}
            ></textarea>
            <button className="todoId-save-button" onClick={edit}>Save</button>
            <button className="todoId-undone-button" onClick={markDone}>Mark as Unfinished</button>

          </div>
        </>
      } else {
        return <>
          <NavBar/>
          <div className="todoId-edit-container">
            <textarea
            class="todoId-edit-input"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown = {(e)=>{if (e.key === 'Enter'){edit()}}}
            ></textarea>
            <button className="todoId-save-button" onClick={edit}>Save</button>
            <button className="todoId-done-button" onClick={markDone}>Mark as Done</button>

          </div>
        </>
      }