import { useState } from "react";
import "./Form.scss";
import { useLocation, useNavigate } from "react-router-dom";

export function Notice() {
  const { state } = useLocation();
  const { token } = state;
const [course, setCourse] = useState("");
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
 const handleDropdownChange = (event) => {
   setCourse(event.target.value);
 };
  const onSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/notice/createnotice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({
        title: title,
        description: description,
        course: course,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          console.log(e);
        }
        return response.json();
      })
      .then((data) => {
        navigate("/home", { state: { token } });
        console.log(data)
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="Page" style={{ height: "100vh" }}>
      <form className="Form" onSubmit={(e) => onSubmit(e)}>
        <h2>Add a Notice</h2>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Text Title"
        />
        <label htmlFor="description">Description:</label>
        <input
          id="description"
          required
          value={description}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Enter Text Description"
        />
        <label htmlFor="dropdown">Select Course:</label>
        <select
          id="dropdown"
          value={course}
          onChange={handleDropdownChange}
          style={{
            width: "100%",
            height: "42px",
            paddingLeft: "10px",
            borderRadius: "5px",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <option value="">--Select Course--</option>
          <option value="CA Foundation">CA Foundation</option>
          <option value="CA Intermediate">CA Intermediate</option>
          <option value="CA Final">CA Final</option>
          <option value="CS-EET">CS-EET</option>
          <option value="CS Executive">CS Executive</option>
          <option value="CMA Foundation">CMA Foundation</option>
          <option value="CMA Intermediate">CMA Intermediate</option>
          <option value="CMA Final">CMA Final</option>
          <option value="B. Com">B. Com</option>
          <option value="M. Com">M. Com</option>
          <option value="Computer Course">Computer Course</option>
          <option value="11th">11th</option>
          <option value="12th">12th</option>
        </select>
        <div className="btn-wrapper">
          <button className="submit-btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
