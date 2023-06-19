import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Form.scss";

export function RegisterStudent() {
  const { state } = useLocation();
  const { token } = state;

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [studySubject, setStudySubject] = useState("");
  const [course, setCourse] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [_state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [classMode, setClassMode] = useState("");
  const [imageUrl, setImageUrl] = useState();

  const onSubmitReg = (e) => {
    e.preventDefault();
    fetch("http://13.127.252.0:8000/auth/studentReg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify({
        name,
        email,
        dateOfBirth,
        fatherName,
        gender,
        studentPhone,
        parentPhone,
        studySubject,
        course,
        address,
        city,
        state: _state,
        postalCode,
        country,
        classMode,
        photo: imageUrl,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(e);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        navigate("/home", { state: { token } });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  var openFile = function (file) {
    var input = file.target;
    var reader = new FileReader();
    reader.onload = function () {
      var dataURL = reader.result;
      var output = document.getElementById("output");
      output.src = dataURL;
      setImageUrl(dataURL);
    };
    reader.readAsDataURL(input.files[0]);
  };

  return (
    // add photo field
    <div className="Page">
      <form className="Form" onSubmit={(e) => onSubmitReg(e)}>
        <h2>Student Registration</h2>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <label htmlFor="fatherName">Fathername:</label>
        <input
          id="fatherName"
          required
          value={fatherName}
          onChange={(e) => {
            setFatherName(e.target.value);
          }}
          placeholder="Enter your fathername"
        />
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Enter your email"
        />
        <label htmlFor="dateOfBirth">Date Of Birth:</label>
        <input
          id="dateOfBirth"
          required
          value={dateOfBirth}
          onChange={(e) => {
            setDateOfBirth(e.target.value);
          }}
          placeholder="Enter date of birth"
        />
        <label htmlFor="gender">Gender:</label>
        <input
          id="gender"
          required
          value={gender}
          onChange={(e) => {
            setGender(e.target.value);
          }}
          placeholder="Enter gender"
        />
        <label htmlFor="studentPhone">Student Phone Number:</label>
        <input
          id="studentPhone"
          required
          value={studentPhone}
          onChange={(e) => {
            setStudentPhone(e.target.value);
          }}
          placeholder="Enter student phone number"
        />
        <label htmlFor="parentPhone">Parent Phone Number:</label>
        <input
          id="parentPhone"
          required
          value={parentPhone}
          onChange={(e) => {
            setParentPhone(e.target.value);
          }}
          placeholder="Enter your parent phone number"
        />
        <label htmlFor="studySubject">Subject:</label>
        <input
          id="studySubject"
          required
          value={studySubject}
          onChange={(e) => {
            setStudySubject(e.target.value);
          }}
          placeholder="Enter your subject"
        />
        <label htmlFor="course">Course:</label>
        <input
          id="course"
          required
          value={course}
          onChange={(e) => {
            setCourse(e.target.value);
          }}
          placeholder="Enter your course"
        />
        <label htmlFor="address">Address:</label>
        <input
          id="address"
          required
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          placeholder="Enter your address"
        />
        <label htmlFor="apartment">Apartment:</label>
        <input
          id="apartment"
          value={apartment}
          onChange={(e) => {
            setApartment(e.target.value);
          }}
          placeholder="Enter your apartment"
        />
        <label htmlFor="city">City:</label>
        <input
          id="city"
          required
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
          placeholder="Enter your city"
        />
        <label htmlFor="state">State:</label>
        <input
          id="state"
          required
          value={_state}
          onChange={(e) => {
            setState(e.target.value);
          }}
          placeholder="Enter your state"
        />
        <label htmlFor="postalCode">Postal Code:</label>
        <input
          id="postalCode"
          required
          value={postalCode}
          onChange={(e) => {
            setPostalCode(e.target.value);
          }}
          placeholder="Enter your postal code"
        />
        <label htmlFor="country">Country:</label>
        <input
          id="country"
          required
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
          }}
          placeholder="Enter your country"
        />
        <label htmlFor="classMode">Class Mode:</label>
        <input
          id="classMode"
          required
          value={classMode}
          onChange={(e) => {
            setClassMode(e.target.value);
          }}
          placeholder="Enter your class mode"
        />
        <label htmlFor="uploadImage">Photo:</label>
        <div className="upload-images">Upload images (optional)</div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => openFile(e)}
          id="uploadImage"
          name="myPhoto"
        />
        <img className="image" id="output" alt="" />
        <div className="btn-wrapper">
          <button className="submit-btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
