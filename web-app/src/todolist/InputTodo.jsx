import React, { Fragment, useState } from "react";

const InputTodo = ({ setTodosChange }) => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.getItem("token"));

      const body = { description };
      const response = await fetch("http://localhost:8080/dashboard/todos", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body)
      });

      const parseResponse = await response.json();

      console.log(parseResponse);
      window.location.reload();

      setTodosChange(true);
      setDescription("");

      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

// const fetchTodos = async() => {
// const [todos, setTodos] = useState();
//     const response = await fetch("http://localhost:8080/dashboard/", {
//         method: "GET",
//         headers: {token: localStorage.getItem("token")}
//         // body: JSON.stringify(body)

//     });
//     const parseRes = await response.json();
//     // setTodos(parseRes);
//     console.log(parseRes);
//     setTodos(parseRes);
// return(parseRes);
    
//     }
    
// let data = fetchTodos();

  return (
    <Fragment>
      <h1 className="text-center my-5">Input Todo</h1>
      <form className="d-flex" onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="add todo"
          className="form-control"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button className="btn btn-success ">Add</button>
      </form>
      <p></p>
    </Fragment>
  );
};

export default InputTodo;