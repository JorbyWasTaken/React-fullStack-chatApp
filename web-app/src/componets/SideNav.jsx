import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/App.css'
import { GiAnarchy } from "react-icons/gi";
import {BiLogOut, BiEnvelope, BiCog, BiBookmark} from 'react-icons/bi'
const SideNav = () => {
    return(
<div>
    <nav className='side-nav-container'>
    <div className='friend-container'>
<h1>friends</h1>
<div className='friend-btns'>
<button>friend</button>

<button>friend</button>
<button>friend</button>
<button>friend</button>
<button>friend</button>
<button>friend</button>
<button>friend</button>
<button>friend</button>
<button>friend</button>
<button>friend</button>
<button>friend</button>
<button>friend</button>


</div>
</div>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>

<a> <BiBookmark /> <span> saved</span> </a>
<hr></hr>
<a> <BiLogOut /> <span> log out</span> </a>
<hr></hr>
<Link to='/contact'> <BiEnvelope /> <span> contact us</span> </Link> 

<hr></hr>
<a> <BiCog /> </a>
{/* <div className='friend-container'>
<h1>friends</h1>
<div className='friend-btns'>
<button>friend</button>

<button>friend</button>
<button>friend</button>
<button>friend</button>
<button>friend</button>
<button>friend</button>
<button>friend</button>

</div>
</div> */}
    </nav>
</div>
    )
}
export default SideNav;