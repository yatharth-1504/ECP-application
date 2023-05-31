import { useState } from "react";
import "./Form.scss";

export function RegisterStudent() {
  const [email, setEmail] = useState();
  const [username, setName] = useState();
  const [adress, setAddress] = useState();

  const onSubmitReg = (e) => {
    e.preventDefault();
    console.log("Hi");
  };

  return (
    // add photo field
    <div className="Page">
      <form className="Form" onSubmit={(e) => onSubmitReg(e)}>
        <h2>Student Registration</h2>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="name">Username:</label>
        <input
          id="name"
          required
          value={username}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label htmlFor="address">Address:</label>
        <input
          id="address"
          required
          value={adress}
          onChange={(e) => {
            setAddress(e.target.value);
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
