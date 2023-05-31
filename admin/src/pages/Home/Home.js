import { Student } from "../../components/Card/Student";
import { Notice } from "../../components/Card/Notice";
import { Nav } from "../../components/Nav/Nav";

export function Home() {
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
  };

  const onRegister = () => {
    console.log("reg");
  };

  return (
    <div className="Home">
      <Nav onAdd={onAdd} onSearch={onSearch} onRegister={onRegister} />
      <Student students={students} />
      <Notice notices={notices}/>
    </div>
  );
}
