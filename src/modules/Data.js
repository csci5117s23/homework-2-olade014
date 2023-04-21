const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

//get all todo items for this user
export async function getTodoItems(authToken, userId) {
  const result = await fetch(backend_base + "/todos?userId=" + userId, {
    'method':'GET',
    'headers': {'Authorization':'Bearer ' + authToken,}
  })
  return await result.json();
}

function compareDate(a,b){
  const dateA = new Date(a["createdOn"]);
  const dateB = new Date(b["createdOn"]);
  if(dateA > dateB){
      return -1;
  }
  if(dateB > dateA){
      return 1;
  } 
  return 0;
}


//get all done todo items for this user
export async function getDoneTodoItems(authToken, userId) {
    const result = await fetch(backend_base + "/todos?userId=" + userId + "&done=true", {
      'method':'GET',
      'headers': {'Authorization':'Bearer ' + authToken,}
    })
    if (result.ok) {
        const todos = await result.json();
        todos.sort(compareDate);
        return todos;
    } else {
        return null;
    }
    
  }

  //get all undone todo items for this user
export async function getUndoneTodoItems(authToken, userId) {
    const result = await fetch(backend_base + "/todos?userId=" + userId + "&done=false", {
      'method':'GET',
      'headers': {'Authorization':'Bearer ' + authToken,}
    })
    if (result.ok) {
        //get the json object
        const todos = await result.json();
        //sort the todo items by the date they were created on using dateCompare
        todos.sort(compareDate);
        return todos;
    } else {
        return null;
    }
  }

  //get one todo item with the given id
  export async function getTodoItemById(authToken, id) {
    const result = await fetch(backend_base + "/todos?_id=" + id, {
      'method':'GET',
      'headers': {'Authorization':'Bearer ' + authToken,}
    })
    return await result.json();
  }

  // add a new todo item
export async function addTodoItem(authToken, userId, name, done, createdOn) {
    const result = await fetch(backend_base+"/todos",{
        'method':'POST',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify({userId,
            name,
            done,
            createdOn})
    })
    return await result.json();
}

//mark todo item as done
export async function updateTodo(authToken, userId, name, done, createdOn, id){
    const result = await fetch(backend_base + "/todos/" + id, {
        'method':'PUT',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify({userId,
            name,
            done,
            createdOn})
    })
    
    console.log(JSON.stringify({userId,
      name,
      done,
      createdOn}))
    return await result.json();
}
