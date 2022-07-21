import React, {useState, useEffect, useMemo} from 'react';
import { Outlet } from "react-router-dom";
import Home from "./pages/LoginPage";

const ProtectedRoutes = () => {
const [isAuthenticated, setIsAuthenticated] = useState(false);

const checkAuthenticated = async () => {    
        try {
            const res = await fetch("http://localhost:8080/auth/verify", {
            method: "POST",
            headers: { token: localStorage.getItem("token") }
        });
            const parseRes = await res.json();
        
            parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
        } catch (err) {
            console.error(err.message);   
}
return{isAuthenticated}

};
const isLoggedIn = useMemo(() => checkAuthenticated(), [isAuthenticated]);

console.log(isLoggedIn)
useEffect(() => {
checkAuthenticated();
},[])   
    const useAuth = () => {
        const checkLog = localStorage.getItem('authenticated');   
            const user = {loggedIn: false}
                if ( 
                    checkLog === 'yes' &&
                    isAuthenticated === true
                ){
                    {user.loggedIn = true}
                }
                return user && user.loggedIn;
               
            };        

        const isAuth = useAuth();
    return isAuth ? <Outlet/> : <Home  />
}
export default ProtectedRoutes;