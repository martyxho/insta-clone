import React, { useState } from "react";
import { signUp, signIn } from "../firebase";

function SignUpForm ({ close }) {
  const [value, setValue] = useState('');

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleSignUp () {
    signUp(value);
    close();
  }

  function handleLogin() {
    signIn();
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
        <button type="button" onClick={handleLogin} >Login</button>
      </form>
    </div>
  )
}

export default SignUpForm;