import React, { Fragment, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import style from '../styles/login.css';

//LOGIN FUNCTION
const Login = ({ setAuth }) => {
  
let navigate = useNavigate();
const checkToken = async() => {
  return new Promise (async(resolve, reject) => {
  let response = await fetch('http://localhost:8080/auth/verify',{
    method: 'POST',
    headers: { token: localStorage.getItem("token") }
  });
  const verifyToken = await response.json();  
    if(verifyToken === true){
      resolve(true);
    }else{
      reject(false);
    }
      }).then(() => {
        console.log('yes');
        localStorage.setItem("authenticated", 'yes');
        navigate('/home');
        window.location.reload();

        }).catch((err) => {
          console.error(err.message)
        localStorage.setItem("authenticated", "no");
      })
  };
  
const [inputs, setInputs] = useState({
  email: "",
  password: ""
});
const { email, password } = inputs;

const onChange = e => 
  setInputs({...inputs, [e.target.name]: e.target.value });
const onSubmitForm = async e => {
  e.preventDefault();

try {
  const body = { email, password };
  const response = await fetch(
    "http://localhost:8080/auth/login",{
      method: "POST",
      headers: {
      "Content-type": "application/json" },
      body: JSON.stringify(body),
  }
);

const parseRes = await response.json();

//IF TOKEN IS PRESENT
    if (parseRes) {
      localStorage.setItem("token", parseRes.token);
      checkToken();
    }else {
      setAuth(false);
    };
}catch (err) {
  console.error(err);
    }
  };

  //CLEAR BTN
 const testButton = () =>{
   let email = document.getElementById('email');
   let password = document.getElementById('password');
   email.value = '';
   password.value = '';
 };

 //CHECK FOR CAP LOCKS
const checkCap = () => {
  let message = document.getElementById("capMessage");
  const passwordInput = document.getElementById("password")

 passwordInput.addEventListener('keydown', e => {
  if(e.getModifierState('CapsLock')) {
    message.style.animation = 'capOn 1s linear';
    message.textContent = "WARNING: CAPS LOCK IS ON :)"
    setTimeout(() => {
     message.style.animation = 'capOff 1s linear'
    },1500);
    setTimeout(() => {
      message.textContent = ''
    }, 2500);
  }}
)};
  return (
    <Fragment>
      <div className="log-outer-container">
      <div className="form-container-log">
      <h1 className="header">log in</h1>
      <div className="email-pass-container">

      <form onSubmit={onSubmitForm}>
        <input
          onClick={checkCap}
          required
          placeholder="enter email"
          id="email"
          type="text"
          name="email"
          value={email}
          onChange={e => onChange(e)}
          className="email-box-log"
        />
    
        <input
        onClick={checkCap}
          required
          placeholder="enter password"
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={e => onChange(e)}
          className="password-box-log"
        />
        <p id="capMessage"></p>
      
        <button className="sub-btn-log">
          <span className='sub-btn-txt'>log in</span>
          </button>
        
      </form>
      </div>
      {/* <button className="clear-btn-log" onClick={testButton}>clear</button> */}
<div>
  <span>don't have an account? </span>
  <span >
  <Link className="register-text" to="/register"> register</Link>

  </span>
</div>
      </div>
      </div>
    </Fragment>
  );
};

export default Login;