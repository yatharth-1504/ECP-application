import "./Card.scss";

export function Student({ students }) {
  return (
    <div className="Cards">
      <h2>Registered Students...</h2>
      {students.map((student, id) => (
        <div className="Card" key={id}>
          <h3>Name: {student.name}</h3>
          <h3>Email: {student.email}</h3>
          <h3>Address: {student.address}</h3>
        </div>
      ))}
    </div>
  );
}
