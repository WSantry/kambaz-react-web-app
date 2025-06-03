import { Form, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { addAssignment, updateAssignment } from "./reducer";

type OnlineEntryOption =
  | "text"
  | "url"
  | "media"
  | "annotation"
  | "fileup";

interface AssignmentForm {
  _id: string;
  title: string;
  description: string;
  points: number;
  assignmentGroup: string;
  displayGradeAs: string;
  submissionType: "online" | "onpaper";
  onlineEntryOption: OnlineEntryOption[];
  assignTo: string;
  dueDate: string;
  availableDate: string;
  untilDate: string;
  course: string | undefined;
}

const getDefaultDates = () => {
  const now = new Date();

  // 12:00 AM tomorrow
  const available = new Date(now);
  available.setDate(available.getDate() + 1);
  available.setHours(0, 0, 0, 0);

  // 11:59 PM one week from today
  const due = new Date(now);
  due.setDate(due.getDate() + 7);
  due.setHours(23, 59, 0, 0);

  const until = new Date(due);

  const toInput = (d: Date) => {
    const tzOffset = d.getTimezoneOffset() * 60_000;
    return new Date(d.getTime() - tzOffset).toISOString().slice(0, 16);
  };

  return {
    availableDate: toInput(available),
    dueDate: toInput(due),
    untilDate: toInput(until),
  };
};

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { assignments: allAssignments } = useSelector(
    (state: any) => state.assignmentsReducer
  );
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const existingAssignment = allAssignments.find((a: any) => a._id === aid);

  /* ----------  default state for NEW assignment  ---------- */
  const defaults: AssignmentForm = {
    _id: "",
    title: "",
    description: "",
    points: 100,
    assignmentGroup: "Assignments",
    displayGradeAs: "points",
    submissionType: "online",
    onlineEntryOption: ["fileup"], 
    assignTo: "Students",
    course: cid,
    ...getDefaultDates(),
  };

  const [assignmentData, setAssignmentData] =
    useState<AssignmentForm>(defaults);

  /* ---------- load / reset on route change ---------- */
  useEffect(() => {
    if (aid === "new") {
      // brand-new form
      setAssignmentData({ ...defaults, course: cid });
    } else if (existingAssignment) {
      // editing an existing assignment
      setAssignmentData(() => {
        const loaded = {
          ...(existingAssignment as AssignmentForm),
          onlineEntryOption:
            typeof existingAssignment.onlineEntryOption === "string"
              ? (existingAssignment.onlineEntryOption
                  .split(",")
                  .map((s: string) => s.trim())
                  .filter(Boolean) as OnlineEntryOption[])
              : (existingAssignment.onlineEntryOption as OnlineEntryOption[]),
        };
        if (loaded.submissionType === "onpaper") {
          loaded.onlineEntryOption = [];
        }
        return loaded;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aid, cid, existingAssignment]);

  const handleField = <K extends keyof AssignmentForm>(
    field: K,
    value: AssignmentForm[K]
  ) => setAssignmentData((p) => ({ ...p, [field]: value }));

  const toggleOption = (opt: OnlineEntryOption) =>
    setAssignmentData((p) => {
      const exists = p.onlineEntryOption.includes(opt);
      return {
        ...p,
        onlineEntryOption: exists
          ? p.onlineEntryOption.filter((o) => o !== opt)
          : [...p.onlineEntryOption, opt],
      };
    });

  const handleSave = () => {
    const payload = {
      ...assignmentData,
      onlineEntryOption: assignmentData.onlineEntryOption.join(","),
    };

    if (aid === "new") {
      dispatch(addAssignment(payload));
    } else {
      dispatch(updateAssignment(payload));
    }
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => navigate(`/Kambaz/Courses/${cid}/Assignments`);

  if (!assignmentData) return <h2>Assignment not found</h2>;

  return (
    <div id="wd-assignments-editor" className="p-3">
      <Form>
        {/* Assignment Name */}
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            type="text"
            value={assignmentData.title}
            onChange={(e) => handleField("title", e.target.value)}
          />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-3" controlId="wd-description">
          <Form.Control
            as="textarea"
            rows={7}
            value={assignmentData.description}
            onChange={(e) => handleField("description", e.target.value)}
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
              min={0}
              value={assignmentData.points}
              onChange={(e) =>
                handleField("points", Number(e.target.value) || 0)
              }
            />
          </Col>
        </Form.Group>

        {/* Assignment Group */}
        <Form.Group as={Row} className="mb-3" controlId="wd-group">
          <Form.Label column sm={2} className="text-end">
            Assignment Group
          </Form.Label>
          <Col sm={10}>
            <Form.Select
              value={assignmentData.assignmentGroup}
              onChange={(e) => handleField("assignmentGroup", e.target.value)}
            >
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
            <Form.Select
              value={assignmentData.displayGradeAs}
              onChange={(e) => handleField("displayGradeAs", e.target.value)}
            >
              <option value="points">Points</option>
              <option value="percentage">Percentage</option>
              <option value="letter">Letter Grade</option>
            </Form.Select>
          </Col>
        </Form.Group>

        {/* Submission Type + Online Options */}
        <Form.Group as={Row} className="mb-3" controlId="wd-submission-type">
          <Form.Label column sm={2} className="text-end">
            Submission Type
          </Form.Label>
          <Col sm={10}>
            <div className="border rounded p-3">
              <Form.Select
                className="mb-3"
                value={assignmentData.submissionType}
                onChange={(e) => {
                  const type =
                    e.target.value as AssignmentForm["submissionType"];
                  setAssignmentData((p) => ({
                    ...p,
                    submissionType: type,
                    onlineEntryOption: type === "online" ? [] : [], // clear all
                  }));
                }}
              >
                <option value="online">Online</option>
                <option value="onpaper">On Paper</option>
              </Form.Select>

              {assignmentData.submissionType === "online" && (
                <>
                  <div className="fw-bold mb-2">Online Entry Options</div>
                  <div className="ms-2">
                    {[
                      { id: "text", label: "Text Entry" },
                      { id: "url", label: "Website URL" },
                      { id: "media", label: "Media Recordings" },
                      { id: "annotation", label: "Student Annotation" },
                      { id: "fileup", label: "File Uploads" },
                    ].map((opt) => (
                      <Form.Check
                        key={opt.id}
                        id={`wd-${opt.id}`}
                        type="checkbox"
                        label={opt.label}
                        checked={assignmentData.onlineEntryOption.includes(
                          opt.id as OnlineEntryOption
                        )}
                        onChange={() =>
                          toggleOption(opt.id as OnlineEntryOption)
                        }
                      />
                    ))}
                  </div>
                </>
              )}
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
                <Form.Select
                  value={assignmentData.assignTo}
                  onChange={(e) => handleField("assignTo", e.target.value)}
                >
                  <option value="Everyone">Everyone</option>
                  <option value="Teachers">Teachers</option>
                  <option value="Students">Students</option>
                </Form.Select>
              </Form.Group>

              {/* Due */}
              <Form.Group className="mb-3" controlId="wd-due-date">
                <Form.Label className="fw-bold">Due</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={assignmentData.dueDate.slice(0, 16)}
                  onChange={(e) => handleField("dueDate", e.target.value)}
                />
              </Form.Group>

              {/* Available From + Until */}
              <Row>
                <Col md={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="wd-available-from"
                  >
                    <Form.Label className="fw-bold">
                      Available from
                    </Form.Label>
                    <Form.Control
                      type="datetime-local"
                      value={assignmentData.availableDate.slice(0, 16)}
                      onChange={(e) =>
                        handleField("availableDate", e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="wd-available-until"
                  >
                    <Form.Label className="fw-bold">Until</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      value={assignmentData.untilDate.slice(0, 16)}
                      onChange={(e) =>
                        handleField("untilDate", e.target.value)
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </Col>
        </Form.Group>

        {/* Footer */}
        <hr />
        <div className="text-end">
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-secondary me-2"
          >
            Cancel
          </button>
          {currentUser.role === "FACULTY" && (
            <button
              type="button"
              onClick={handleSave}
              className="btn btn-danger"
            >
              Save
            </button>
          )}
        </div>
      </Form>
    </div>
  );
}
