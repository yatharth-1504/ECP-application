import _search from "../../assets/search.webp";
import add from "../../assets/add-button.jpg";
import "./Nav.scss";
import { useState } from "react";

export function Nav({ onRegister, onAdd_1, onAdd_2, onSearch }) {
  const [search, setSearch] = useState("");
  return (
    <div className="Nav-Bar">
      <nav>
        <div className="button-wrapper">
          <button onClick={(e) => onRegister()}>
            <img src={add} alt="Add" className="img"></img>
            Register
          </button>
          <button onClick={(e) => onAdd_1()}>
            <img src={add} alt="Add" className="img"></img>
            Add Notice
          </button>
          <button onClick={(e) => onAdd_2()}>
            <img src={add} alt="Add" className="img"></img>
            Add Resource
          </button>
          <button>
            <img
              src={_search}
              alt="Add"
              className="img"
              onClick={(e) => onSearch(search)}
            ></img>
            <input
              id="search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for Student"
            />
          </button>
        </div>
      </nav>
    </div>
  );
}
