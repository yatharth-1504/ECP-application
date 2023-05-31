import search from "../../assets/search.webp";
import add from "../../assets/add-button.jpg";
import "./Nav.scss";

export function Nav({ onRegister, onAdd, onSearch }) {
  return (
    <div className="Nav-Bar">
      <nav>
        <div className="button-wrapper">
          <button onClick={(e) => onRegister()}>
            <img src={add} alt="Add" className="img"></img>
            Register
          </button>
          <button onClick={(e) => onAdd()}>
            <img src={add} alt="Add" className="img"></img>
            Add Notice
          </button>
          <button>
            <img
              src={search}
              alt="Add"
              className="img"
              onClick={(e) => onSearch()}
            ></img>
            Search
          </button>
        </div>
      </nav>
    </div>
  );
}
