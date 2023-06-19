import { useState } from "react";
import "./Form.scss";
import { useLocation, useNavigate } from "react-router-dom";

export function Resource() {
  const { state } = useLocation();
  const { token } = state;

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    fetch("http://13.127.252.0:8000/resource/createresource", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({
        title: title,
        description: description,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(e);
        }
        return response.json();
      })
      .then((data) => {
        navigate("/home", { state: { token } });
      })
      .catch((e) => {
        throw new Error(e);
      });
  };

  return (
    <div className="Page" style={{ height: "100vh" }}>
      <form className="Form" onSubmit={(e) => onSubmit(e)}>
        <h2>Add a Resource</h2>
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
          value={description}
          onChange={(e) => setDesc(e.target.value)}
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
