import { useSelector, useDispatch } from "react-redux";
import { addCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
import { useState } from "react"; // for form data
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);

  const dispatch = useDispatch();

  // Local state for form data
  const [course, setCourse] = useState<any>({
    _id: "",
    name: "New Course",
    number: "",
    startDate: "",
    endDate: "",
    description: "New Description",
  });

  const handleAddCourse = () => {
    dispatch(addCourse(course));
  };
  const handleDeleteCourse = (courseId: string) => {
    dispatch(deleteCourse(courseId));
  };
  const handleUpdateCourse = () => {
    dispatch(updateCourse(course));
  };

  // Filter to show only courses that user is enrolled in
  const userCourses = courses.filter((courseItem: any) =>
    enrollments.some(
      (enrollment: any) =>
        enrollment.user === currentUser?._id &&
        enrollment.course === courseItem._id
    )
  );

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {currentUser?.role === "FACULTY" && (
        <>
          <h5>
            New or Edit Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={handleAddCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={handleUpdateCourse}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            value={course.description}
            as="textarea"
            rows={3}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </>
      )}
<h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {userCourses.map((courseItem: any) => (
            <Col
              key={courseItem._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                <Link
                  to={`/Kambaz/Courses/${courseItem._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <Card.Img
                    src="/images/reactjs.jpg"
                    variant="top"
                    width="100%"
                    height={160}
                  />

                  <Card.Body className="card-body">
                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {courseItem.name}
                    </Card.Title>
                    <Card.Text
                      className="wd-dashboard-course-description overflow-hidden mb-3"
                      style={{ height: "100px" }}
                    >
                      {courseItem.description}
                    </Card.Text>
                  </Card.Body>
                </Link>

                <div className="d-flex justify-content-between p-2">
                  <Button variant="primary">Go</Button>

                  {currentUser?.role === "FACULTY" && (
                    <div className="d-flex gap-2">
                      <Button
                        variant="warning"
                        id="wd-edit-course-click"
                        onClick={(e) => {
                          e.preventDefault();
                          // set local state for editing
                          setCourse(courseItem);
                        }}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="danger"
                        id="wd-delete-course-click"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDeleteCourse(courseItem._id);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
