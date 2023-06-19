import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.scss";

export function Login() {
  const [roll, setRoll] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate();

  const onSubmitLogin = (e) => {
    e.preventDefault();
    // navigate to the other page
    fetch("http://13.127.252.0:8000/auth/adminsignin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: roll,
        password: pass,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(e);
        }
        return response.json();
      })
      .then((data) => {
        navigate("/home", { state: { token: data.token } });
      })
      .catch((e) => {
        throw new Error(e);
      });
  };

  return (
    <div className="Page" style={{ height: "100vh" }}>
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
