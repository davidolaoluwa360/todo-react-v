import classes from "./App.module.css";
import React from "react";
import Card from "./components/UI/Card";
import AddTodo from "./components/TODO/AddTodo";
import TodoList from "./components/TODO/TodoList";
import { TodoProvider } from "./Store/todo-context";

function App() {
  return (
    <TodoProvider>
      <section className={classes.app}>
        <Card class={classes["todo-container"]}>
          <div className={classes["add-container"]}>
            <AddTodo />
          </div>
          <div className={classes["todoList-container"]}>
            <TodoList />
          </div>
        </Card>
      </section>
    </TodoProvider>
  );
}

export default App;
