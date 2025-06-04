import { useState }     from "react";
import { FormControl }  from "react-bootstrap";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export default function PathParameters() {
  const [a, setA] = useState("34");
  const [b, setB] = useState("23");

  const btn = (id: string, href: string, label: string, cls = "btn btn-primary me-2") =>
    <a id={id} className={cls} href={href}>{label}</a>;

  return (
    <div id="wd-path-parameters">
      <h3>Path Parameters</h3>
      <FormControl className="mb-2" id="wd-path-parameter-a" type="number"
                   value={a} onChange={e => setA(e.target.value)} />
      <FormControl className="mb-2" id="wd-path-parameter-b" type="number"
                   value={b} onChange={e => setB(e.target.value)} />

      {btn("wd-path-parameter-add",
           `${REMOTE_SERVER}/lab5/add/${a}/${b}`,
           `Add ${a} + ${b}`)}

      {btn("wd-path-parameter-subtract",
           `${REMOTE_SERVER}/lab5/subtract/${a}/${b}`,
           `Subtract ${a} - ${b}`,
           "btn btn-danger me-2")}

      {btn("wd-path-parameter-multiply",
           `${REMOTE_SERVER}/lab5/multiply/${a}/${b}`,
           `Multiply ${a} × ${b}`,
           "btn btn-success me-2")}

      {btn("wd-path-parameter-divide",
           `${REMOTE_SERVER}/lab5/divide/${a}/${b}`,
           `Divide ${a} ÷ ${b}`,
           "btn btn-warning")}

      <hr />
    </div>
  );
}
