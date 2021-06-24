import React, { useContext } from "react";
import Todo from "./Todo";
import TodoContext from "../../Store/todo-context";

const TodoList = (props) => {
  const todos = useContext(TodoContext);
  const onEditHandler = function (id) {
    todos.setEditId(id);
  };

  const onDeleteHandler = function (id) {
    todos.removeTodo(id);
  };

  return (
    <React.Fragment>
      {todos.items.map((todo) => {
        return (
          <Todo
            key={todo.id}
            title={todo.title}
            onEdit={onEditHandler}
            onDelete={onDeleteHandler}
            id={todo.id}
          ></Todo>
        );
      })}
    </React.Fragment>
  );
};

export default TodoList;
