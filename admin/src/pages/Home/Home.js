import { Student } from "../../components/Card/Student";
import { Notice } from "../../components/Card/Notice";
import { Nav } from "../../components/Nav/Nav";
import { useLocation, useNavigate } from "react-router-dom";

export function Home() {
  const state = useLocation();
  const { token } = state;

  const navigate = useNavigate();

  const students = [
    {
      name: "Yatharth",
      email: "yatharth@gmail.com",
      address: "D-1/409 Ashok Nagar, gali no. 13",
    },
    {
      name: "Amit",
      email: "amit@gmail.com",
      address: "D-1/409 Ashok Nagar, gali no. 13",
    },
    {
      name: "Hanu",
      email: "hanu@gmail.com",
      address: "D-1/409 Ashok Nagar, gali no. 13",
    },
  ];

  const notices = [
    {
      title: "Test on Friday",
      description: "Kindly appear for the test on friday!",
    },
    {
      title: "Lorem ipsum",
      description: "Lorem ipsum doloar lonar wabba labba dab dab!",
    },
  ];

  const onSearch = () => {
    console.log("search");
  };

  const onAdd = () => {
    console.log("add");
    navigate("/notice", { state: { token } });
  };

  const onRegister = () => {
    console.log("reg");
    navigate("/register", { state: { token } });
  };

  return (
    <div className="Home">
      <Nav onAdd={onAdd} onSearch={onSearch} onRegister={onRegister} />
      <Student students={students} />
      <Notice notices={notices} />
    </div>
  );
}
