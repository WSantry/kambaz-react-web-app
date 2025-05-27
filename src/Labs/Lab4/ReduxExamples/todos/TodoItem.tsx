import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
import { ListGroup, Button } from "react-bootstrap";

export default function TodoItem({ todo }: { todo: any }) {
  const dispatch = useDispatch();

  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-center">
      <span className="fs-5">{todo.title}</span>
      <div className="d-flex gap-2">
        <Button
          onClick={() => dispatch(setTodo(todo))}
          id="wd-set-todo-click"
          className="btn-primary"
        >
          Edit
        </Button>

        <Button
          onClick={() => dispatch(deleteTodo(todo.id))}
          id="wd-delete-todo-click"
          className="btn-danger"
        >
          Delete
        </Button>
      </div>
    </ListGroup.Item>
  );
}
