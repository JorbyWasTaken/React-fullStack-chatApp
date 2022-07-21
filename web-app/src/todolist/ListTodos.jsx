import React, { Fragment, useState, useEffect } from "react";
import EditTodos from "../todolist/EditTodos";

const ListTodos = ({ allTodos, setTodosChange }) => {
  const [todos, setTodos] = useState([]); //empty array

  //delete todo function

  async function deleteTodo(id) {
    try {
      await fetch(`http://localhost:8080/dashboard/todos/${id}`, {
        method: "DELETE",
        headers: { token: localStorage.getItem('token') }
      });

      setTodos(todos.filter(todo => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  async function getTodos() {
    const res = await fetch("http://localhost:8080/dashboard/todos",{
        headers:{ token: localStorage.getItem('token') }

    });

    const todoArray = await res.json();

    setTodos(todoArray);
  }

  useEffect(() => {
    getTodos();
  }, []);


  const [description, setDescription] = useState();

  const editText = async id => {
    try {
      const body = { description };

      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append('token', localStorage.getItem('token'));

      await fetch(`http://localhost:8080/dashboard/todos/${id}`, {
        method: "PUT",
        headers: myHeaders ,
        // {
        //     "Content-type": "application/json",
        //     "token": localStorage.getItem('token')
        //   },
        // headers: myHeaders,
        body: JSON.stringify(body)
      });

      

      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      {" "}
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Description</th>
<br></br>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
            
            {/* <p>{todos.map(todo => (
                <p>{todo.description}</p>
            ))}</p> */}
          {/*<tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr> */}

          {todos.length !== 0 &&
            todos[0].todo_id !== null &&
            todos.map(todo => (
              <tr key={todo.todo_id}>
                <td>{todo.description}</td>
                <td>
                  <EditTodos todo={todo} setTodosChange={setTodosChange} />
                </td>
                <td>
                <div className="modal-body">
                    <br></br>
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
            <br></br>
            
              <button
              
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={() => editText(todo.todo_id)}
              >
                Edit
              </button>
              
              <br></br>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTodo(todo.todo_id)}
                  >
                    Delete
                  </button>
                  
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;