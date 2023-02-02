import React, { useState, useEffect } from "react";
import { signUp, handleLogin, getUsernames } from "../firebase";
import { useNavigate } from "react-router-dom";
import logo from '../assets/images/instagram-logo.png';

function SignUp ({refresh}) {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [usernames, setUsernames] = useState([]);
  const [helper, setHelper] = useState(false);

  useEffect(() => {
    async function setState() {
      setUsernames(await getUsernames());
    }
    setState();
  });

  function handleChange(e) {
    setValue(e.target.value);
    setHelper(false);
  }

  async function handleSignUp (e) {
    e.preventDefault();
    if (usernames.includes(value)) {
      setHelper(true);
    } else {
      await signUp(value);
      navigate('/');
      refresh();
    }
  }

  async function loginClick() {
    const login = await handleLogin();
    if (login) {
      navigate('/');
    } 
  }

  return (
    <div className="signUp">
      <div className="signUp-container">
        <div className="signUp-header">
          <img className="signUp-logoImg" src={logo} alt='instagram logo'/>
          <div>
            <h2 className="signUp-headerText">Sign Up</h2>
          </div>
        </div>
        <div className="signUp-formContainer">
          <form pattern='[0-9a-zA-Z_.-]*' className="signUp-form" onSubmit={handleSignUp}>
            <div className="signUp-input">
              <div className="signUp-username">
                <p>@</p>
              </div>
              <input required className="signUp-inputBox" maxLength={15} minLength={3} type='text' placeholder="username" value={value} onChange={handleChange} />
            </div>
            <div className="signUp-helperDiv">
              {helper && 
                <p className="signUp-helper red">
                  Username is taken.
                </p>
              }
              {!helper &&
                <p className="signUp-helper">
                  Name must be 3-15 characters.
                </p> 
              }
            </div>
            <button type="submit" className="signUp-signUpBtn">Sign Up With Google</button>
          </form>
          <p className="signUp-or">Already signed up?</p>
          <button className="signUp-loginBtn" type="button" onClick={loginClick} >Login</button>
        </div>
      </div>
    </div>
  )
}

export default SignUp;