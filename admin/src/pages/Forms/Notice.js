import { useState } from "react";
import "./Form.scss";

export function Notice() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const onSubmitLogin = (e) => {
    e.preventDefault();
    // navigate to the other page
    console.log("Hi");
  };

  return (
    <div className="Page">
      <form className="Form" onSubmit={(e) => onSubmitLogin(e)}>
        <h2>Add a Notice</h2>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="description">Description:</label>
        <input
          id="description"
          required
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
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
