/* src/Labs/Lab5/WorkingWithObjectsAsynchronously.tsx */
import { useEffect, useState } from "react";
import { FormControl }         from "react-bootstrap";
import * as client             from "./client";

export default function WorkingWithObjectsAsynchronously() {
  const [assignment, setAssignment] = useState<any>({});

  /* ─────────────── fetch once on load ─────────────── */
  const fetchAssignment = async () => {
    const data = await client.fetchAssignment();
    setAssignment(data);
  };
  useEffect(() => { fetchAssignment(); }, []);

  /* ─────────────── update title only ──────────────── */
  const updateTitle = async (title: string) => {
    const updated = await client.updateTitle(title);
    setAssignment(updated);
  };

  /* avoid rendering empty fields before data arrives */
  if (!assignment?.id) { return <p>Loading assignment…</p>; }

  return (
    <div id="wd-asynchronous-objects">
      <h3>Working with Objects Asynchronously</h3>
      <h4>Assignment</h4>

      {/* editable fields bound to local state */}
      <FormControl
        className="mb-2"
        value={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />
      <FormControl
        as="textarea"
        rows={3}
        className="mb-2"
        value={assignment.description}
        onChange={(e) =>
          setAssignment({ ...assignment, description: e.target.value })
        }
      />
      <FormControl
        type="date"
        className="mb-2"
        value={assignment.due}
        onChange={(e) =>
          setAssignment({ ...assignment, due: e.target.value })
        }
      />

      <div className="form-check form-switch mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          id="wd-completed"
          checked={assignment.completed}
          onChange={(e) =>
            setAssignment({ ...assignment, completed: e.target.checked })
          }
        />
        <label className="form-check-label" htmlFor="wd-completed">
          Completed
        </label>
      </div>

      {/* update button */}
      <button
        className="btn btn-primary me-2"
        id="wd-update-assignment-title"
        onClick={() => updateTitle(assignment.title)}
      >
        Update Title
      </button>

      {/* pretty-print the live object */}
      <pre>{JSON.stringify(assignment, null, 2)}</pre>
      <hr />
    </div>
  );
}
