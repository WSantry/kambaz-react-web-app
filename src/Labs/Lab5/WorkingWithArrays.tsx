import { useState }     from "react";
import { FormControl }  from "react-bootstrap";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const API           = `${REMOTE_SERVER}/lab5/todos`;

export default function WorkingWithArrays() {
  const [todo, setTodo] = useState({ id: "1", title: "NodeJS Assignment" });

  return (
    <div id="wd-working-with-arrays">
      <h3>Working with Arrays (link tests)</h3>

      <h4>Retrieving Arrays</h4>
      <a id="wd-retrieve-todos" className="btn btn-primary" href={API}>Get Todos</a>
      <hr/>

      <h4>Retrieving an Item by ID</h4>
      <a id="wd-retrieve-todo-by-id" className="btn btn-primary float-end" href={`${API}/${todo.id}`}>Get Todo by ID</a>
      <FormControl id="wd-todo-id" className="w-50"
                   value={todo.id}
                   onChange={e => setTodo({ ...todo, id: e.target.value })}/>
      <hr/>

      <h4>Filtering</h4>
      <a id="wd-retrieve-completed-todos" className="btn btn-primary" href={`${API}?completed=true`}>Get Completed Todos</a>
      <hr/>

      <h4>Creating, Deleting, Updating (legacy GET routes)</h4>
      <a className="btn btn-success me-2" href={`${API}/create`}>Create Todo</a>
      <a className="btn btn-danger  me-2" href={`${API}/${todo.id}/delete`}>Delete Todo with ID = {todo.id}</a>
      <a className="btn btn-warning"      href={`${API}/${todo.id}/title/${todo.title}`}>Update Todo To {todo.title}</a>
      <FormControl className="w-75 mt-2"
                   value={todo.title}
                   onChange={e => setTodo({ ...todo, title: e.target.value })}/>
      <hr/>
    </div>
  );
}
