import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <React.Fragment>
      <div className={classes.formGroup}>
        <input
          {...props.input}
          onChange={props.onChange}
          onBlur={props.onBlur}
          className={classes["form-control"]}
        />
      </div>
    </React.Fragment>
  );
};

export default Input;
