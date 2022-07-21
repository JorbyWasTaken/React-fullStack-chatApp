import React, { useState } from "react";
const CreateGroup = ({ setGroupChange }) => {
  const [group_name, setGroupname] = useState("");
  const [group_description, setGroupDescription] = useState("");
  const onSubmitForm = async e => {
    e.preventDefault();
    let datee = new Date();
let newDate = 
`${datee.getMonth()}/${datee.getDate()}/${datee.getFullYear()} 
 ${datee.getHours() - 12}:${datee.getMinutes()}`;
    if (group_name.length < 3){
      console.error('name too short')
    };
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.getItem("token"));
      const body = { group_name, group_description, newDate };
      await fetch("http://localhost:8080/group/newgroup", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body)
      });
      window.location.reload();
      setGroupChange(true);
      setGroupChange("");
    } catch (err) {
      console.error(err.message);
    }};
  return (
    <>
      <h3 className="text-center my-5">create room?</h3>
      <form className="d-flex" onSubmit={onSubmitForm}>
        <input
          required
          type="text"
          placeholder="new group name"
          className="form-control"
          value={group_name}
          onChange={e => setGroupname(e.target.value)}
        />
        <input
          required
          type="text"
          placeholder="group description?"
          className="form-control"
          value={group_description}
          onChange={e => setGroupDescription(e.target.value)}
        />
        <button className="btn btn-success ">create</button>
      </form>
      <p></p>
    </>
  );
};

export default CreateGroup;