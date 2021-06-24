import React, { useState, useContext, useEffect } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import classes from "./AddTodo.module.css";
import TodoContext from "../../Store/todo-context";

const AddTodo = (props) => {
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const todoContext = useContext(TodoContext);
  const [todoIsValid, setTodoIsValid] = useState(false);

  useEffect(() => {
    if (todoContext.editId) {
      const ExistingTodo = todoContext.items.find(
        (todo) => todo.id === todoContext.editId
      );
      setTitle(ExistingTodo.title);
      setEditId(ExistingTodo.id);
      setTodoIsValid(true);
    }
  }, [todoContext.editId, todoContext.items]);

  const onSubmitTodoHandler = function (e) {
    e.preventDefault();
    if (!todoIsValid) {
      alert("Todo cannot be empty");
    } else {
      todoContext.addTodo({
        id: editId ? editId : new Date().toISOString() + Math.random(),
        title: title,
      });
      setTitle("");
      setTodoIsValid(false);
      if (editId) {
        todoContext.removeEditId();
        setEditId(null);
      }
    }
  };

  const setTodoChangeHandler = function (e) {
    setTitle(e.target.value);
    if (e.target.value.trim().length > 0) {
      setTodoIsValid(true);
    } else {
      setTodoIsValid(false);
    }
  };

  return (
    <React.Fragment>
      <form className={classes.form} onSubmit={onSubmitTodoHandler}>
        <Input
          input={{
            type: "text",
            placeholder: "Create a todo",
            value: title,
          }}
          onChange={setTodoChangeHandler}
        />
        <Button type="submit" color="btn-secondary">
          Add Todo
        </Button>
      </form>
    </React.Fragment>
  );
};

export default AddTodo;
