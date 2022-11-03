import React, { useState } from "react";
import { handleSignUp } from "../firebase";

function SignUpForm () {
  const [value, setValue] = useState('');

  function handleChange(e) {
    setValue(e.target.value);
  }

  function signUp () {
    handleSignUp(value);
  }

  return (
    <div id="sign-up-form">
      <form>
        <label>
          <input type='text' placeholder="username" value={value} onChange={handleChange} />
        </label>
        <button type="button" onClick={signUp}>Sign Up With Google</button>
        <button type="button">Login</button>
      </form>
    </div>
  )
}

export default SignUpForm;