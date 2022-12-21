import { Link } from "react-router-dom";
import { signOutUser } from "../firebase";

function Nav ({ user }) {
  return (
    <nav>
      <div id="logo">
        <Link to='/'>Instagram</Link>
      </div>
      <div id="search">

      </div>
      <div id="nav-btns">
        {user &&
          <button onClick={signOutUser}>Log Out</button>
        }
      </div>
    </nav>
  )
} 

export default Nav;