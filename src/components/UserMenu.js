import { useEffect } from "react";
import { Link } from "react-router-dom";
import { signOutUser, handleLogin } from "../firebase";

function UserMenu ({ user, close }) {
  useEffect(() => {
    window.addEventListener('click', close);

    return () => window.removeEventListener('click', close);
  });

  return (
    <div className="user-menu">
      {user &&
        <div className="user-menu-inner">
          <Link className="user-menu-option" to={'/profile/' + user.uid}>
            <p>Profile</p>
          </Link>
          <div className="user-menu-option" onClick={signOutUser}>
            <p>Logout</p>
          </div>
        </div>
      }
      {!user &&
        <div className="user-menu-inner">
          <div className="user-menu-option" onClick={handleLogin}>
            <p>Login</p>
          </div>
        </div>
      }
    </div>
  )
}

export default UserMenu;