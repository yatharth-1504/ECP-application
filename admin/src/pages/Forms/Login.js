import { useState } from "react";
import "./Form.scss";

export function Login() {
  const [roll, setRoll] = useState("");
  const [pass, setPass] = useState("");

  const onSubmitLogin = (e) => {
    e.preventDefault();
    // navigate to the other page
    console.log("Hi");
  };

  return (
    <div className="Page">
      <form className="Form" onSubmit={(e) => onSubmitLogin(e)}>
        <h2>Admin Login</h2>
        <label htmlFor="roll">Email:</label>
        <input
          id="roll"
          type="text"
          required
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          required
          value={pass}
          onChange={(e) => {
            setPass(e.target.value);
          }}
        />
        <div className="btn-wrapper">
          <button className="submit-btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
