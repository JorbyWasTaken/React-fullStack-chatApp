
const Join = () => {
const join = async( id ) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", localStorage.getItem("token"));
await fetch(`http://localhost:8080/group/joinroom/${id}`, {
    method: 'POST',
    headers: myHeaders,
    // body: JSON.stringify(body)
});
}
return{ join }
};

export default Join;
