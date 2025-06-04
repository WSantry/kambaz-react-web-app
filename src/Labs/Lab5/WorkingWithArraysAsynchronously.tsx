import { useEffect, useState } from "react";
import { ListGroup, FormControl } from "react-bootstrap";
import { FaPlusCircle, FaTrash } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { FaPencil } from "react-icons/fa6";
import * as client from "./client";

export default function WorkingWithArraysAsynchronously() {
    const [todos, setTodos] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    /* ---- helpers ------------------------------------------------ */
    const refresh = () => client.fetchTodos().then(setTodos);

    const optimistic = (fn: () => Promise<any>) => fn().catch((e: any) =>
        setError(e.response?.data?.message ?? e.toString()));

    const removeLegacy = (t: any) => optimistic(async () => setTodos(await client.removeTodo(t)));
    const deleteTodo = (t: any) => optimistic(async () => {
        await client.deleteTodo(t);
        setTodos(todos.filter(x => x.id !== t.id));
    });

    const updateTodo = (t: any) => optimistic(async () => {
        await client.updateTodo(t);
        setTodos(todos.map(x => x.id === t.id ? { ...t, editing: false } : x));
    });

    useEffect(() => {
        refresh();
    }, []);

    /* ---- UI ----------------------------------------------------- */
    return (
        <div id="wd-asynchronous-arrays">
            <h3>Working with Arrays Asynchronously</h3>
            {error && <div id="wd-todo-error-message" className="alert alert-danger">{error}</div>}

            <h4>
                Todos
                <FaPlusCircle className="text-success float-end fs-3" id="wd-create-todo"
                    onClick={() => client.createTodo().then(setTodos)} />
                <FaPlusCircle className="text-primary float-end fs-3 me-3" id="wd-post-todo"
                    onClick={() => client.postTodo({ title: "New Posted Todo", completed: false })
                        .then(n => setTodos([...todos, n]))} />
            </h4>

            <ListGroup>
                {todos.map(t => (
                    <ListGroup.Item key={t.id}>
                        {/* delete buttons */}
                        <FaTrash id="wd-remove-todo" className="text-danger float-end ms-2 mt-1"
                            onClick={() => removeLegacy(t)} />
                        <TiDelete id="wd-delete-todo" className="text-danger float-end fs-3 mt-1"
                            onClick={() => deleteTodo(t)} />

                        {/* edit pencil */}
                        <FaPencil className="text-primary float-end ms-2 mt-1"
                            onClick={() => setTodos(todos.map(x => x.id === t.id ? { ...x, editing: true } : x))} />

                        {/* completed checkbox */}
                        <input type="checkbox" className="form-check-input me-2 float-start"
                            defaultChecked={t.completed}
                            onChange={e => updateTodo({ ...t, completed: e.target.checked })} />

                        {/* title / edit field */}
                        {!t.editing ? (
                            <span style={{ textDecoration: t.completed ? "line-through" : "none" }}>{t.title}</span>
                        ) : (
                            <FormControl className="w-50 float-start"
                                defaultValue={t.title}
                                onKeyDown={e => e.key === "Enter" && updateTodo({ ...t })}
                                onChange={e => setTodos(todos.map(x => x.id === t.id ? { ...t, title: e.target.value } : x))} />
                        )}
                    </ListGroup.Item>
                ))}
            </ListGroup><hr />
        </div>
    );
}
