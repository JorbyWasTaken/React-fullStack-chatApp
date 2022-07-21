import {useState, useEffect} from 'react';

const GetName = () => {
  const [name, setName] = useState('');
  const [myId, setMyId ] = useState();
const getname = async() => {
    try {
      const res = await fetch("http://localhost:8080/dashboard/name", {
        headers: { token: localStorage.getItem("token") }
      });
      const parseData = await res.json();
      setName(parseData.user_name);
      setMyId(parseData.user_id)
    } catch (err) {
      console.error(err.message);
    }
};
useEffect(() => {
getname();
}, [])
   return { name, myId };
};

export default GetName;






