import { Form, Row, Col } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { assignments } from "../../Database";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignment = assignments.find(a => a._id === aid);

  // fallback if not found
  if (!assignment) {
    return <h2>Assignment not found</h2>;
  }

  return (
    <div id="wd-assignments-editor" className="p-3">

      <Form>
        {/* Assignment Name */}
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control type="text" defaultValue={assignment.title} />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-3" controlId="wd-description">
          <Form.Control as="textarea" rows={7} defaultValue={assignment.description} />
        </Form.Group>

        {/* Points */}
        <Form.Group as={Row} className="mb-3" controlId="wd-points">
          <Form.Label column sm={2} className="text-end">
            Points
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="number" defaultValue={assignment.points} />
          </Col>
        </Form.Group>

        {/* Assignment Group */}
        <Form.Group as={Row} className="mb-3" controlId="wd-group">
          <Form.Label column sm={2} className="text-end">
            Assignment Group
          </Form.Label>
          <Col sm={10}>
            <Form.Select defaultValue="Assignments">
              <option value="Assignments">Assignments</option>
              <option value="Quizzes">Quizzes</option>
              <option value="Exams">Exams</option>
              <option value="Project">Project</option>
            </Form.Select>
          </Col>
        </Form.Group>

        {/* Display Grade As */}
        <Form.Group as={Row} className="mb-3" controlId="wd-display-grade-as">
          <Form.Label column sm={2} className="text-end">
            Display Grade as
          </Form.Label>
          <Col sm={10}>
            <Form.Select defaultValue="points">
              <option value="points">Points</option>
              <option value="percentage">Percentage</option>
              <option value="letter">Letter Grade</option>
            </Form.Select>
          </Col>
        </Form.Group>

        {/* Submission Type */}
        <Form.Group as={Row} className="mb-3" controlId="wd-submission-type">
          <Form.Label column sm={2} className="text-end">
            Submission Type
          </Form.Label>
          <Col sm={10}>
            <div className="border rounded p-3">
              <Form.Select defaultValue="online" className="mb-3">
                <option value="online">Online</option>
                <option value="onpaper">On Paper</option>
              </Form.Select>
              <div className="fw-bold mb-2">Online Entry Options</div>
              <div className="ms-2">
                <Form.Check id="wd-text-entry" type="checkbox" label="Text Entry" />
                <Form.Check id="wd-website-url" type="checkbox" label="Website URL" defaultChecked />
                <Form.Check id="wd-media-recordings" type="checkbox" label="Media Recordings" />
                <Form.Check id="wd-student-annotation" type="checkbox" label="Student Annotation" />
                <Form.Check id="wd-file-upload" type="checkbox" label="File Uploads" />
              </div>
            </div>
          </Col>
        </Form.Group>

        {/* Assign Section */}
        <Form.Group as={Row} className="mb-3" controlId="wd-assign-group">
          <Form.Label column sm={2} className="text-end">
            Assign
          </Form.Label>
          <Col sm={10}>
            <div className="border rounded p-3">
              {/* Assign To */}
              <Form.Group className="mb-3" controlId="wd-assign-to">
                <Form.Label className="fw-bold">Assign to</Form.Label>
                <Form.Select defaultValue="Everyone">
                  <option value="Everyone">Everyone</option>
                  <option value="Teachers">Teachers</option>
                  <option value="Students">Students</option>
                </Form.Select>
              </Form.Group>

              {/* Due Date */}
              <Form.Group className="mb-3" controlId="wd-due-date">
                <Form.Label className="fw-bold">Due</Form.Label>
                <Form.Control type="datetime-local" defaultValue={assignment.dueDate ? assignment.dueDate.slice(0, 16) : ""} />
              </Form.Group>

              {/* Available From + Until on same row */}
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="wd-available-from">
                    <Form.Label className="fw-bold">Available from</Form.Label>
                    <Form.Control type="datetime-local" defaultValue={assignment.availableDate ? assignment.availableDate.slice(0, 16) : ""} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="wd-available-until">
                    <Form.Label className="fw-bold">Until</Form.Label>
                    <Form.Control type="datetime-local" defaultValue={assignment.untilDate ? assignment.untilDate.slice(0, 16) : ""} />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </Col>
        </Form.Group>


        <hr />
        <div className="text-end">
          <Link
            to={`/Kambaz/Courses/${cid}/Assignments`}
            className="btn btn-secondary me-2"
          >
            Cancel
          </Link>
          <Link
            to={`/Kambaz/Courses/${cid}/Assignments`}
            className="btn btn-danger"
          >
            Save
          </Link>
        </div>
      </Form>
    </div>
  );
}
