import React, { useReducer } from 'react';

const actions = {
    Follow: 'follow',
    UnFollow: 'unfollow'
};
const reducer = (state, action) => {
    switch(action.type) {
        case 'follow':       
            return { following: state.following = true };
        case 'unfollow':
            return { following: state.following = false };
        default: 
            return state;
    }
};

const TestCompo = (props) => {
const [state, dispatch] = useReducer(reducer, {following: false});

const follow = () => {
    dispatch({ type: actions.Follow})
};
const unfollow = () => {
    dispatch({ type: actions.UnFollow})
};
return(
<div>
    {/* <p> your name is {props.name}</p>
     your favorite color is {props.color}
     <br></br>
     <>
     {state.following ? 'following': 'not following'}
     <button onClick={follow}> follow</button>
     <button onClick={unfollow}> unfollow</button>
     </> */}
</div>
)};
export default TestCompo;