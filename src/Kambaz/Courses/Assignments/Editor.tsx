// File: src/Kambaz/Courses/Assignments/Editor.tsx
import { Form, Row, Col } from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import { assignments } from "../../Database";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { addAssignment, updateAssignment } from "./reducer";

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { assignments: allAssignments } = useSelector(
    (state: any) => state.assignmentsReducer
  );
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  // If aid === "new", we are creating a new assignment.
  // Otherwise, find existing assignment in Redux store.
  const existingAssignment = allAssignments.find((a: any) => a._id === aid);

  const [assignmentData, setAssignmentData] = useState<any>({
    _id: "",
    title: "",
    description: "",
    points: 100,
    assignmentGroup: "Assignments",
    submissionType: "online",
    onlineEntryOption: "fileup",
    assignTo: "Everyone",
    dueDate: "",
    availableDate: "",
    untilDate: "",
    course: cid,
  });

  useEffect(() => {
    if (aid === "new") {
      // For "Create new" just keep the defaults
      setAssignmentData((prev: any) => ({
        ...prev,
        _id: "",
        course: cid,
      }));
    } else {
      // For existing assignment, load from Redux store if found
      if (!existingAssignment) {
        return; // or show error if not found
      }
      setAssignmentData(existingAssignment);
    }
  }, [aid, cid, existingAssignment]);

  const handleChange = (field: string, value: any) => {
    setAssignmentData({ ...assignmentData, [field]: value });
  };

  const handleSave = () => {
    if (aid === "new") {
      // dispatch addAssignment
      dispatch(addAssignment(assignmentData));
    } else {
      // dispatch updateAssignment
      dispatch(updateAssignment(assignmentData));
    }
    // navigate back to /Kambaz/Courses/:cid/Assignments
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  if (!assignmentData) {
    return <h2>Assignment not found</h2>;
  }

  return (
    <div id="wd-assignments-editor" className="p-3">
      <Form>
        {/* Assignment Name */}
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            type="text"
            value={assignmentData.title || ""}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-3" controlId="wd-description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={7}
            value={assignmentData.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </Form.Group>

        {/* Points */}
        <Form.Group as={Row} className="mb-3" controlId="wd-points">
          <Form.Label column sm={2} className="text-end">
            Points
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              value={assignmentData.points || ""}
              onChange={(e) => handleChange("points", e.target.value)}
            />
          </Col>
        </Form.Group>

        {/* Due Date */}
        <Form.Group as={Row} className="mb-3" controlId="wd-due-date">
          <Form.Label column sm={2} className="text-end">
            Due Date
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="datetime-local"
              value={
                assignmentData.dueDate
                  ? assignmentData.dueDate.slice(0, 16)
                  : ""
              }
              onChange={(e) => handleChange("dueDate", e.target.value)}
            />
          </Col>
        </Form.Group>

        {/* Available From */}
        <Form.Group as={Row} className="mb-3" controlId="wd-available-from">
          <Form.Label column sm={2} className="text-end">
            Available From
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="datetime-local"
              value={
                assignmentData.availableDate
                  ? assignmentData.availableDate.slice(0, 16)
                  : ""
              }
              onChange={(e) => handleChange("availableDate", e.target.value)}
            />
          </Col>
        </Form.Group>

        {/* Available Until */}
        <Form.Group as={Row} className="mb-3" controlId="wd-available-until">
          <Form.Label column sm={2} className="text-end">
            Until
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="datetime-local"
              value={
                assignmentData.untilDate
                  ? assignmentData.untilDate.slice(0, 16)
                  : ""
              }
              onChange={(e) => handleChange("untilDate", e.target.value)}
            />
          </Col>
        </Form.Group>

        <hr />
        <div className="text-end">
          {/* Cancel */}
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-secondary me-2"
          >
            Cancel
          </button>

          {/* Save */}
          {currentUser.role === "FACULTY" && (
            <button type="button" onClick={handleSave} className="btn btn-danger">
              Save
            </button>
          )}
        </div>
      </Form>
    </div>
  );
}
