import React from "react";
import classes from "./Todo.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const Todo = (props) => {
  const onEditHandler = function () {
    props.onEdit(props.id);
  };

  const onDeleteHandler = function () {
    props.onDelete(props.id);
  };

  return (
    <React.Fragment>
      <div className={classes["todo-item__container"]}>
        <div className={classes["todo-item__name"]}>{props.title}</div>
        <div className="todo-item__action">
          <i onClick={onEditHandler} className={classes.font}>
            <FontAwesomeIcon icon={faPenSquare} />
          </i>

          <i className={classes.font} onClick={onDeleteHandler}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </i>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Todo;
