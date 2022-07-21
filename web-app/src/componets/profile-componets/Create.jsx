import React from 'react';
import CreateGroup from './CreateGroup';
import CreatePost from './CreatePost';

const Create = () => {    
    return(
        <div className='create-container'>
            <hr></hr>
                <CreatePost />
            <hr></hr>
                <CreateGroup />
            <hr></hr>
        </div>
    )
};
export default Create;