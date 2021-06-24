import React, { useReducer, useEffect, useState } from "react";

const TodoContext = React.createContext({
  todos: [],
  addTodo: (todo) => {},
  removeTodo: (id) => {},
  editId: null,
  setEditId: (id) => {},
  removeEditId: () => {},
});

const addToLocalstorage = (updatedTodo) => {
  localStorage.setItem("todos", JSON.stringify(updatedTodo));
};

const getItemFromLocalstorage = () => {
  return JSON.parse(localStorage.getItem("todos"));
};

const todoReducer = (state, action) => {
  if (action.type === "ADD_TODO") {
    const todoExist = state.todos.some((todo) => {
      return todo.id === action.item.id;
    });

    const todoExistIndex = state.todos.findIndex((todo) => {
      return todo.id === action.item.id;
    });

    let updatedTodo;
    if (todoExist) {
      const copiedState = [...state.todos];
      copiedState.splice(todoExistIndex, 1, {
        title: action.item.title,
        id: state.todos[todoExistIndex].id,
      });

      updatedTodo = {
        todos: [...copiedState],
      };
    } else {
      updatedTodo = { todos: [action.item, ...state.todos] };
    }
    addToLocalstorage(updatedTodo);
    return updatedTodo;
  }

  if (action.type === "REMOVE_TODO") {
    const updatedTodo = {
      todos: state.todos.filter((todo) => {
        return todo.id !== action.id;
      }),
    };
    addToLocalstorage(updatedTodo);
    return updatedTodo;
  }
  return {
    todos: [],
  };
};

export const TodoProvider = (props) => {
  const [todos, dispatchTodos] = useReducer(todoReducer, { todos: [] });
  const [todoEditId, setTodoEditId] = useState(null);

  const onAddTodoHandler = (todo) => {
    dispatchTodos({ type: "ADD_TODO", item: todo });
  };

  const onRemoveTodo = (id) => {
    dispatchTodos({ type: "REMOVE_TODO", id: id });
  };

  const setTodos = () => {
    const todosItem = getItemFromLocalstorage();
    if (todosItem?.todos.length > 0) {
      todosItem.todos.forEach((todoItem) => {
        dispatchTodos({ type: "ADD_TODO", item: todoItem });
      });
    }
  };

  const onRemoveEditId = () => {
    setTodoEditId(null);
  };

  const onSetEditId = (id) => {
    setTodoEditId(id);
  };

  useEffect(setTodos, []);

  const todoContextValue = {
    items: todos.todos,
    addTodo: onAddTodoHandler,
    removeTodo: onRemoveTodo,
    editId: todoEditId,
    setEditId: onSetEditId,
    removeEditId: onRemoveEditId,
  };

  return (
    <TodoContext.Provider value={todoContextValue}>
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
