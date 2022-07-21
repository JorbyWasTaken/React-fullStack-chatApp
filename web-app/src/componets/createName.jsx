import React, { Fragment, useState } from "react";


const InputName = () => {
    const [name, setName ] = useState('');

    const onSubmitForm = async e => {
        e.preventDefault();
        try{
            const body = { name };
            const response = await fetch('http://localhost:8080/nameinfo', {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(body)
            });
                
            console.log(response);
        }catch(err) {
            console.log(err.message);
        }
    }
    return(
        <Fragment>
        <h1>name</h1>
        <form onSubmit={onSubmitForm}>
            <input type='text'
                   value={name} 
                   onChange={e => setName(e.target.value)
            }/>
            <button>add</button>
        </form>
        </Fragment>
    )
}

export default InputName;