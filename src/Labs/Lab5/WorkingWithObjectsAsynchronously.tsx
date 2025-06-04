import { useEffect, useState } from "react";
import { FormControl }         from "react-bootstrap";
import * as client             from "./client";

export default function WorkingWithObjectsAsynchronously() {
  const [assignment, setAssignment] = useState<any>({});

  useEffect(() => {
    client.fetchAssignment().then(setAssignment);
  }, []);

  const saveTitle = async () => {
    const updated = await client.updateTitle(assignment.title);
    setAssignment(updated);
  };

  if (!assignment?.id) return null;

  return (
    <div id="wd-asynchronous-objects">
      <h3>Working with Objects Asynchronously</h3>
      <FormControl className="mb-2"
                   value={assignment.title || ""}
                   onChange={e => setAssignment({ ...assignment, title: e.target.value })}/>
      <button className="btn btn-primary me-2" onClick={saveTitle}>Update Title</button>
      <pre>{JSON.stringify(assignment, null, 2)}</pre>
      <hr/>
    </div>
  );
}
