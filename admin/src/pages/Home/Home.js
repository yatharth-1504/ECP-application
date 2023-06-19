import { Student } from "../../components/Card/Student";
import { Notice } from "../../components/Card/Notice";
import { Nav } from "../../components/Nav/Nav";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Home.scss";

export function Home() {
  const { state } = useLocation();
  const { token } = state;

  const navigate = useNavigate();

  const [students, setStudents] = useState();
  const [err, setErr] = useState(null);
  const [isPending, setIsPending] = useState(true);

  const [notices, setNotices] = useState();
  const [error, setError] = useState(null);
  const [ispending, setIspending] = useState(false);

  useEffect(() => {
    // fectch for students
    fetch("http://13.127.252.0:8000/auth/getstudents", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setIsPending(false);
        setStudents(data.students);
      })
      .catch((e) => {
        setErr(e);
        setIsPending(false);
      });
    // fectch for notices
    fetch("http://13.127.252.0:8000/notice/getnotices", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error");
        }
        return response.json();
      })
      .then((data) => {
        setIspending(false);
        setNotices(data.notices);
      })
      .catch((e) => {
        setError(e);
        setIspending(false);
      });
  }, []);

  const onSearch = (search) => {
    setStudents(
      students.filter((student) =>
        JSON.stringify(student).toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  const onAdd_1 = () => {
    navigate("/notice", { state: { token } });
  };

  const onAdd_2 = () => {
    navigate("/resource", { state: { token } });
  };

  const onRegister = () => {
    navigate("/register", { state: { token } });
  };

  return (
    <div className="Home">
      <Nav
        onAdd_1={onAdd_1}
        onAdd_2={onAdd_2}
        onSearch={onSearch}
        onRegister={onRegister}
      />
      {isPending && (
        <div className="Message">
          <h2>Loading...</h2>
        </div>
      )}
      {err && (
        <div className="Message">
          <h2>Errors while fetching the resource...</h2>
        </div>
      )}
      {!!students && <Student students={students} />}
      {ispending && (
        <div className="Message">
          <h2>Loading...</h2>
        </div>
      )}
      {error && (
        <div className="Message">
          <h2>Errors while fetching the resource...</h2>
        </div>
      )}
      {!!notices && <Notice notices={notices} />}
    </div>
  );
}
