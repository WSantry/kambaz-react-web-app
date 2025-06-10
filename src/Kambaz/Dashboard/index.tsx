import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card, Button, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";

import {
  addCourse as addCourseLocal,
  deleteCourse as deleteCourseLocal,
  updateCourse as updateCourseLocal,
} from "../Courses/reducer";
import {
  enrollCourse,
  unenrollCourse,
  setEnrollments,
} from "../Courses/Enrollments/reducer";

import * as userClient from "../Account/client";
import * as courseClient from "../Courses/client";
import * as enrollClient from "../Courses/Enrollments/client";

export default function Dashboard() {
  const { currentUser } = useSelector((s: any) => s.accountReducer);
  const { courses } = useSelector((s: any) => s.coursesReducer);
  const { enrollments } = useSelector((s: any) => s.enrollmentsReducer);
  const dispatch = useDispatch();

  /* local draft */
  const [course, setCourse] = useState<any>({
    name: "New Course",
    description: "New description",
  });
  const [showAll, setShowAll] = useState(false);

  /* ─────────────── NEW enrollment-sync effect ─────────────── */
  useEffect(() => {
    (async () => {
      if (currentUser) {
        const data = await enrollClient.fetchMyEnrollments();
        dispatch(setEnrollments(data));
      }
    })();
  }, [currentUser, dispatch]);

  /* helpers */
  const isEnrolled = (cid: string) =>
    enrollments.some((e: any) => e.user === currentUser?._id && e.course === cid);

  const handleAddCourse = async () => {
    const newCourse = await userClient.createCourse(course);
    dispatch(addCourseLocal(newCourse));
    setCourse({ name: "New Course", description: "New description" });
  };

  const handleDeleteCourse = async (cid: string) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    await courseClient.deleteCourse(cid);
    dispatch(deleteCourseLocal(cid));
  };

  const handleUpdateCourse = async () => {
    if (!course._id) return alert("Select a course to update.");
    await courseClient.updateCourse(course);
    dispatch(updateCourseLocal(course));
  };

  const handleEnrollToggle = async (cid: string, enrolled: boolean) => {
    if (!currentUser) return;
    if (enrolled) {
      await enrollClient.unenroll(currentUser._id, cid);
      dispatch(unenrollCourse({ userId: currentUser._id, courseId: cid }));
    } else {
      await enrollClient.enroll(currentUser._id, cid);
      dispatch(enrollCourse({ userId: currentUser._id, courseId: cid }));
    }
  };

  /* filtered lists */
  const myCourses = courses.filter((c: any) => isEnrolled(c._id));
  const displayedCourses = showAll ? courses : myCourses;

  /* ——————————————————— render ——————————————————— */
  return (
    <div id="wd-dashboard">
      <h1 className="d-flex justify-content-between">
        Dashboard
        <Button
          id="wd-toggle-enrollments-btn"
          onClick={() => setShowAll(!showAll)}
        >
          Enrollments
        </Button>
      </h1>
      <hr />

      {currentUser?.role === "FACULTY" && (
        <>
          <h5>
            New or Edit Course
            <Button className="float-end" onClick={handleAddCourse}>
              Add
            </Button>
            <Button
              className="float-end me-2"
              variant="warning"
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

      <h2>
        {showAll ? "Published Courses" : "Enrolled Courses"} (
        {displayedCourses.length})
      </h2>
      <hr />

      <Row xs={1} md={5} className="g-4">
        {displayedCourses.map((c: any) => {
          const enrolled = isEnrolled(c._id);
          return (
            <Col key={c._id} style={{ width: 300 }}>
              <Card className="wd-dashboard-course">
                <Link
                  to={
                    enrolled
                      ? `/Kambaz/Courses/${c._id}/Home`
                      : "/Kambaz/Dashboard"
                  }
                  className="text-decoration-none text-dark"
                >
                  <Card.Img src="/images/reactjs.jpg" height={160} />
                  <Card.Body>
                    <Card.Title className="text-nowrap overflow-hidden">
                      {c.name}
                    </Card.Title>
                    <Card.Text
                      className="overflow-hidden mb-3"
                      style={{ height: 100 }}
                    >
                      {c.description}
                    </Card.Text>
                  </Card.Body>
                </Link>

                <div className="d-flex justify-content-between align-items-center p-2">
                  <div className="d-flex gap-2">
                    <Button
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
                    {!currentUser?.role?.startsWith("ADMIN") && (
                      <Button
                        size="sm"
                        variant={enrolled ? "danger" : "success"}
                        onClick={(e) => {
                          e.preventDefault();
                          handleEnrollToggle(c._id, enrolled);
                        }}
                      >
                        {enrolled ? "Unenroll" : "Enroll"}
                      </Button>
                    )}
                  </div>

                  {currentUser?.role === "FACULTY" && (
                    <div className="d-flex gap-2">
                      <Button
                        size="sm"
                        variant="warning"
                        onClick={(e) => {
                          e.preventDefault();
                          setCourse(c);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
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
  );
}
