import React, {useState} from 'react';
import InputTodos from '../todolist/InputTodo';
import EditTodos from '../todolist/EditTodos';
import ListTodos from '../todolist/ListTodos';
import { useEffect } from 'react/cjs/react.production.min';
import Dashboard from '../componets/Dashboard';

// const [todos, setTodos] = useState();
// const fetchTodos = async() => {
// let response = await fetch("http://localhost:8080/dashboard/", {
//     method: "GET",
//     headers: {token: localStorage.getItem("token")}
// });
// const parseRes = await response.json();
// setTodos(parseRes);
// console.log(parseRes);

// };
// fetchTodos();

const Landing = () => {
   
// const [todos, setTodos] = useState([]);

    return(
        <div>

        <InputTodos />

        {/* <EditTodos /> */}
        <ListTodos />
        <p></p>
        </div>
    )
  
    
}
export default Landing;