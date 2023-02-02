import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOutUser, handleLogin } from "../firebase";

function UserMenu ({ user, close }) {
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener('click', close);

    return () => window.removeEventListener('click', close);
  });

  async function loginClick() {
    const login = await handleLogin();
    if (!login) {
      navigate('/sign-up');
    }
  }

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
          <div className="user-menu-option" onClick={loginClick}>
            <p>Login</p>
          </div>
        </div>
      }
    </div>
  )
}

export default UserMenu;