import {useState, useEffect} from 'react';

const MyFollowers = () => {
const [followers, setFollowers] = useState([]);    
useEffect(() => {
(async() => {
    try {
        const res = await fetch("http://localhost:8080/profile/followers", {
          headers: { token: localStorage.token}
        });
        const parseData = await res.json();
        setFollowers(parseData);

      } catch (err) {
        console.error(err.message);
      }
    })();
}, [])
return{ followers, setFollowers }

};

export default MyFollowers;