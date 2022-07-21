// import logo from './logo.svg';
import React, {useState, useEffect } from 'react';
import './styles/App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage  from './pages/LoginPage';
import About from './pages/About';
import Profile  from './pages/Profile';
import ProtectedRoutes from './ProtectedRoutes';
import NoPage from './pages/NoPage';
import Dashboard from './componets/Dashboard';
// import Login from './componets/Login';
import Register from './componets/Register';
import Home from './pages/Home'
import { ContactUs } from './pages/Contact';
import Landing from './pages/Landing';
import Sock from './chat'
// import SideNav from './componets/SideNav';
import GetName from './GetName';

export const ColorProvider = React.createContext();
export default function App() {
  const {name, myId} = GetName();
const [isAuthenticated, setIsAuthenticated] = useState(false);
// const [loading, setLoading] = useState(true);
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:8080/auth/verify", {
        method: "POST",
        headers: { token: localStorage.getItem("token") }
      });
      const parseRes = await res.json();
      // setLoading(false);
      parseRes ? setIsAuthenticated(true) : setIsAuthenticated(false);      

    } catch (err) {
      console.error(err.message);
  }
};
// const isLoggedIn = useMemo(async() => await checkAuthenticated(), [loading]);

useEffect(() => {
  checkAuthenticated();
}, []);
// if (loading) {
//   return(<>loading</>)
// }
return (
<ColorProvider.Provider value={myId}>
    <BrowserRouter>
{isAuthenticated ? 
<Dashboard /> 
: ''}
<div className={isAuthenticated ? 'main-body' : ''} >
    <div className="App">

    </div>
    <Routes>
       {/* <Route path='/dashboard' element={<Dashboard />} /> */}
    <Route path='register' element={<Register />} />
    {isAuthenticated ? '' :
    <Route path='/' element={<LoginPage />} /> }
    {/* {isAuthenticated ?  */}
    <Route element={<ProtectedRoutes />} >
    <Route path='/home' element={<Home />} />
    <Route path="/todos" element={<Landing />} />
    <Route path='/chat' element={<Sock />} />
    <Route path="/about" element={<About />} />
    <Route path="/profile" element={<Profile />}  />
    <Route path="/contact" element={<ContactUs />}  />
    <Route path="*" element={<NoPage />} /> 
    </Route> 
    {/*  : ''} */}
    </Routes>
    </div>
      </BrowserRouter>
      </ColorProvider.Provider>
  );

}

// export default App;
