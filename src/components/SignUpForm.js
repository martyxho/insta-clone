import React, { useState } from "react";
import { signUp, handleLogin } from "../firebase";

function SignUpForm ({ close, refresh }) {
  const [value, setValue] = useState('');

  function handleChange(e) {
    setValue(e.target.value);
  }

  async function handleSignUp () {
    await signUp(value);
    refresh();
    close();
  }

  function login() {
    handleLogin();
    close();
  }

  return (
    <div id="sign-up-form">
      <button id='close-signUp' onClick={close}>X</button>
      <form>
        <label>
          <input type='text' placeholder="username" value={value} onChange={handleChange} />
        </label>
        <button type="button" onClick={handleSignUp} disabled={value.length < 3} >Sign Up With Google</button>
        <button type="button" onClick={login} >Login</button>
      </form>
    </div>
  )
}

export default SignUpForm;