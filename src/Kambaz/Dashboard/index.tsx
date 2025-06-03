import { useSelector, useDispatch } from "react-redux";
import { addCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import {
  enrollCourse,
  unenrollCourse,
} from "../Courses/Enrollments/reducer";
import {
  Row,
  Col,
  Card,
  Button,
  FormControl,
} from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);

  const dispatch = useDispatch();

  /* ---------- local state ---------- */
  const [course, setCourse] = useState<any>({
    _id: "",
    name: "New Course",
    number: "",
    startDate: "",
    endDate: "",
    description: "New Description",
  });

  const [showAll, setShowAll] = useState(false); // toggle button

  /* ---------- helpers ---------- */
  const handleAddCourse = () => dispatch(addCourse(course));
  const handleDeleteCourse = (courseId: string) => {
    const ok = window.confirm("Are you sure you want to delete this course?");
    if (ok) {
      dispatch(deleteCourse(courseId));
    }
  };
  const handleUpdateCourse = () => dispatch(updateCourse(course));

  const isEnrolled = (courseId: string) =>
    enrollments.some(
      (e: any) => e.user === currentUser?._id && e.course === courseId
    );

  const handleEnrollToggle = (courseId: string, enrolled: boolean) => {
    if (!currentUser) return;
    if (enrolled) {
      dispatch(unenrollCourse({ userId: currentUser._id, courseId }));
    } else {
      dispatch(enrollCourse({ userId: currentUser._id, courseId }));
    }
  };

  /* ---------- course lists ---------- */
  const myCourses = courses.filter((c: any) => isEnrolled(c._id));
  const displayedCourses = showAll ? courses : myCourses;

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title" className="d-flex justify-content-between">
        Dashboard
        <Button
          id="wd-toggle-enrollments-btn"
          variant="primary"
          onClick={() => setShowAll(!showAll)}
        >
          Enrollments
        </Button>
      </h1>
      <hr />

      {/* FACULTY — create / edit courses */}
      {currentUser?.role === "FACULTY" && (
        <>
          <h5>
            New or Edit Course
            <Button
              variant="primary"
              className="float-end"
              id="wd-add-new-course-click"
              onClick={handleAddCourse}
            >
              Add
            </Button>
            <Button
              variant="warning"
              className="float-end me-2"
              id="wd-update-course-click"
              onClick={handleUpdateCourse}
            >
              Update
            </Button>
          </h5>

          <br />
          <FormControl
            className="mb-2"
            value={course.name}
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            as="textarea"
            rows={3}
            value={course.description}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        {showAll ? "Published Courses" : "Enrolled Courses"} ({displayedCourses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {displayedCourses.map((c: any) => {
            const enrolled = isEnrolled(c._id);

            return (
              <Col key={c._id} style={{ width: "300px" }}>
                <Card className="wd-dashboard-course">
                  <Link
                    to={
                      enrolled
                        ? `/Kambaz/Courses/${c._id}/Home`
                        : "/Kambaz/Dashboard"
                    }
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <Card.Img
                      src="/images/reactjs.jpg"
                      variant="top"
                      width="100%"
                      height={160}
                    />
                    <Card.Body>
                      <Card.Title className="text-nowrap overflow-hidden">
                        {c.name}
                      </Card.Title>
                      <Card.Text
                        className="overflow-hidden mb-3"
                        style={{ height: "100px" }}
                      >
                        {c.description}
                      </Card.Text>
                    </Card.Body>
                  </Link>

                  {/* ACTION BUTTONS */}
                  <div className="d-flex flex-nowrap justify-content-between align-items-center p-2">

                    {/* ---------- LEFT SIDE ---------- */}
                    <div className="d-flex flex-nowrap gap-2">
                      {/* Go */}
                      <Button
                        variant="primary"
                        size="sm"
                        as={Link as any}
                        to={
                          enrolled
                            ? `/Kambaz/Courses/${c._id}/Home`
                            : "/Kambaz/Dashboard"
                        }
                      >
                        Go
                      </Button>

                      {/* Enroll / Unenroll */}
                      {!currentUser?.role?.startsWith("ADMIN") && (
                        <Button
                          variant={enrolled ? "danger" : "success"}
                          size="sm"
                          onClick={(e) => {
                            e.preventDefault();
                            handleEnrollToggle(c._id, enrolled);
                          }}
                        >
                          {enrolled ? "Unenroll" : "Enroll"}
                        </Button>
                      )}
                    </div>

                    {/* ---------- RIGHT SIDE (faculty-only) ---------- */}
                    {currentUser?.role === "FACULTY" && (
                      <div className="d-flex flex-nowrap gap-2">
                        <Button
                          variant="warning"
                          size="sm"
                          id="wd-edit-course-click"
                          onClick={(e) => {
                            e.preventDefault();
                            setCourse(c);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          id="wd-delete-course-click"
                          onClick={(e) => {
                            e.preventDefault();
                            handleDeleteCourse(c._id);
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
