const backend_base = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

//get all todo items
export async function getTodoItems(authToken) {
  const result = await fetch(backend_base + "todo", {
    'method':'GET',
    'headers': {'Authorization':'Bearer ' + authToken,}
  })
  return await result.json();
}
Footer
© 2023 GitHub, Inc.
Footer navigation
