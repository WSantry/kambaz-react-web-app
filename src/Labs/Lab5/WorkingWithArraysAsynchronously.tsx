/* src/Labs/Lab5/WorkingWithArraysAsynchronously.tsx */
import { useEffect, useState }    from "react";
import { ListGroup, FormControl } from "react-bootstrap";
import { FaPlusCircle, FaTrash }  from "react-icons/fa";
import { TiDelete }               from "react-icons/ti";
import { FaPencil }               from "react-icons/fa6";
import * as client                from "./client";

export default function WorkingWithArraysAsynchronously() {
  const [todos, setTodos] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  /* helper: wrap async calls + error capture */
  const safe = (fn: () => Promise<any>) =>
    fn().catch((e: any) =>
      setError(e.response?.data?.message ?? e.toString()));

  /* fetch once on mount */
  useEffect(() => { safe(client.fetchTodos).then(setTodos); }, []);

  /* CRUD funcs (unchanged) */
  const createTodo = () => safe(async () => setTodos(await client.createTodo()));
  const postTodo   = () =>
    safe(async () => {
      const n = await client.postTodo({ title: "New Posted Todo", completed: false });
      setTodos((p) => [...p, n]);
    });

  const removeLegacy = (t: any) =>
    safe(async () => setTodos(await client.removeTodo(t)));

  const deleteTodo = (t: any) =>
    safe(async () => {
      await client.deleteTodo(t);
      setTodos((p) => p.filter((x) => x.id !== t.id));
    });

  const updateTodoRemote = (t: any) =>
    safe(async () => {
      await client.updateTodo(t);
      setTodos((p) => p.map((x) => (x.id === t.id ? { ...t, editing: false } : x)));
    });

  /* enable edit mode, store tempTitle so input is controlled */
  const startEditing = (t: any) =>
    setTodos((p) =>
      p.map((x) =>
        x.id === t.id ? { ...x, editing: true, tempTitle: x.title } : x
      )
    );

  /* handle typing in edit box (updates only local state) */
  const changeTempTitle = (t: any, value: string) =>
    setTodos((p) =>
      p.map((x) => (x.id === t.id ? { ...x, tempTitle: value } : x))
    );

  /* when Enter pressed, push update */
  const commitEdit = (t: any) =>
    updateTodoRemote({ ...t, title: t.tempTitle });

  /* UI */
  return (
    <div id="wd-asynchronous-arrays">
      <h3>Working with Arrays Asynchronously</h3>
      {error && (
        <div id="wd-todo-error-message" className="alert alert-danger">
          {error}
        </div>
      )}

      <h4>
        Todos
        <FaPlusCircle id="wd-create-todo"
          className="text-success float-end fs-3"
          onClick={createTodo}/>
        <FaPlusCircle id="wd-post-todo"
          className="text-primary float-end fs-3 me-3"
          onClick={postTodo}/>
      </h4>

      <ListGroup>
        {todos.map((t) => (
          <ListGroup.Item key={t.id}>
            {/* delete buttons */}
            <FaTrash id="wd-remove-todo"
              className="text-danger float-end ms-2 mt-1"
              onClick={() => removeLegacy(t)}/>
            <TiDelete id="wd-delete-todo"
              className="text-danger float-end fs-3"
              onClick={() => deleteTodo(t)}/>

            {/* edit pencil */}
            <FaPencil
              className="text-primary float-end ms-2 mt-1"
              onClick={() => startEditing(t)}
            />

            {/* completed checkbox */}
            <input type="checkbox"
              className="form-check-input me-2 float-start"
              checked={t.completed}
              onChange={(e) => updateTodoRemote({ ...t, completed: e.target.checked })}/>

            {/* title display or edit field */}
            {!t.editing ? (
              <span style={{ textDecoration: t.completed ? "line-through" : "none" }}>
                {t.title}
              </span>
            ) : (
              <FormControl
                className="w-50 float-start"
                value={t.tempTitle}
                onChange={(e) => changeTempTitle(t, e.currentTarget.value)}
                onKeyDown={(e) => e.key === "Enter" && commitEdit(t)}
              />
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>

      <hr />
    </div>
  );
}
