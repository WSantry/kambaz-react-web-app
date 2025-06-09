/* src/Labs/Lab5/WorkingWithArrays.tsx */
import { useState }     from "react";
import { FormControl }  from "react-bootstrap";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const API           = `${REMOTE_SERVER}/lab5/todos`;

export default function WorkingWithArrays() {
  const [todo, setTodo] = useState({
    id:          "1",
    title:       "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    completed:   false,
  });

  // helper to encode description safely for a URL
  const enc = encodeURIComponent;

  return (
    <div id="wd-working-with-arrays">
      <h2>Working with Arrays</h2>

      {/* ─────────────────────────── Retrieve All */}
      <h3>Retrieving Arrays</h3>
      <a id="wd-retrieve-todos" className="btn btn-primary" href={API}>
        Get Todos
      </a>
      <hr />

      {/* ─────────────────────────── Retrieve by ID */}
      <h3>Retrieving an Item from an Array by ID</h3>
      <div className="row g-2 align-items-center mb-2">
        <div className="col-6 col-lg-4">
          <FormControl
            id="wd-todo-id"
            value={todo.id}
            onChange={(e) => setTodo({ ...todo, id: e.target.value })}
          />
        </div>
        <div className="col-auto">
          <a
            id="wd-retrieve-todo-by-id"
            className="btn btn-primary"
            href={`${API}/${todo.id}`}
          >
            Get Todo by ID
          </a>
        </div>
      </div>
      <hr />

      {/* ─────────────────────────── Filtering */}
      <h3>Filtering Array Items</h3>
      <a
        id="wd-retrieve-completed-todos"
        className="btn btn-primary"
        href={`${API}?completed=true`}
      >
        Get Completed Todos
      </a>
      <hr />

      {/* ─────────────────────────── Create */}
      <h3>Creating new Items in an Array</h3>
      <a className="btn btn-success" href={`${API}/create`}>
        Create Todo
      </a>
      <hr />

      {/* ─────────────────────────── Delete */}
      <h3>Deleting from an Array</h3>
      <div className="row g-2 align-items-center mb-2">
        <div className="col-6 col-lg-4">
          <FormControl
            value={todo.id}
            onChange={(e) => setTodo({ ...todo, id: e.target.value })}
          />
        </div>
        <div className="col-auto">
          <a
            id="wd-delete-todo"
            className="btn btn-danger"
            href={`${API}/${todo.id}/delete`}
          >
            Delete Todo with ID = {todo.id}
          </a>
        </div>
      </div>
      <hr />

      {/* ─────────────────────────── Update */}
      <h3>Updating an Item in an Array</h3>

      {/* update title line */}
      <div className="row g-2 align-items-center mb-2">
        <div className="col-2 col-lg-1">
          <FormControl
            value={todo.id}
            onChange={(e) => setTodo({ ...todo, id: e.target.value })}
          />
        </div>
        <div className="col-6 col-lg-5">
          <FormControl
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
        </div>
        <div className="col-auto">
          <a
            id="wd-update-todo-title"
            className="btn btn-warning"
            href={`${API}/${todo.id}/title/${enc(todo.title)}`}
          >
            Update Title
          </a>
        </div>
      </div>

      {/* update description line */}
      <div className="row g-2 align-items-center mb-2">
        <div className="col-8 col-lg-6">
          <FormControl
            value={todo.description}
            onChange={(e) =>
              setTodo({ ...todo, description: e.target.value })
            }
          />
        </div>
        <div className="col-auto">
          <a
            id="wd-update-todo-description"
            className="btn btn-info"
            href={`${API}/${todo.id}/description/${enc(todo.description)}`}
          >
            Update Description
          </a>
        </div>
      </div>

      {/* update completed line */}
      <div className="row g-2 align-items-center">
        <div className="col-auto">
          <input
            id="wd-completed-checkbox"
            type="checkbox"
            className="form-check-input me-1"
            checked={todo.completed}
            onChange={(e) =>
              setTodo({ ...todo, completed: e.target.checked })
            }
          />
          <label
            className="form-check-label"
            htmlFor="wd-completed-checkbox"
          >
            Completed
          </label>
        </div>
        <div className="col-auto">
          <a
            id="wd-update-todo-completed"
            className="btn btn-secondary"
            href={`${API}/${todo.id}/completed/${todo.completed}`}
          >
            Update Completed
          </a>
        </div>
      </div>

      <hr />
    </div>
  );
}
