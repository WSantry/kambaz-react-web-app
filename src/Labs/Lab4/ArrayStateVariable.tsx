import { useState } from "react";


export default function ArrayStateVariable() {
  const [array, setArray] = useState<number[]>([1, 2, 3, 4, 5]);

  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };

  const deleteElement = (index: number) => {
    setArray(array.filter((_, i) => i !== index));
  };

  return (
    <div id="wd-array-state-variables" className="w-50">
      <h2>Array State Variable</h2>
      <button className="btn btn-success mb-3" onClick={addElement}>Add Element</button>
      <ul className="list-group border rounded mb-3">
        {array.map((item, index) => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
            <span className="fs-4">{item}</span>
            <button className="btn btn-danger" onClick={() => deleteElement(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <hr />
    </div>
  );
}