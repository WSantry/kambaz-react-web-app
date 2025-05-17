import { Button } from "react-bootstrap";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiBell } from "react-icons/bi";
import { LiaChartBarSolid } from "react-icons/lia";
import { FaUserGraduate } from "react-icons/fa";

export default function CourseStatus() {
  return (
    <div id="wd-course-status" style={{ width: "300px" }}>
      <h2>Course Status</h2>
      <div className="d-flex mb-2">
        <Button variant="secondary" size="lg" className="w-50 me-1">
          <MdDoNotDisturbAlt className="me-1 fs-5" />
          Unpublish
        </Button>
        <Button variant="success" size="lg" className="w-50">
          <FaCheckCircle className="me-1 fs-5" />
          Publish
        </Button>
      </div>
      <Button variant="secondary" size="lg" className="w-100 mb-2 text-start">
        <BiBell className="me-2 fs-5" />
        View Course Notifications
      </Button>
      <Button variant="secondary" size="lg" className="w-100 mb-2 text-start">
        <LiaChartBarSolid className="me-2 fs-5" />
        View Course Analytics
      </Button>
      <Button variant="secondary" size="lg" className="w-100 mb-2 text-start">
        <FaUserGraduate className="me-2 fs-5" />
        Student View
      </Button>
    </div>
  );
}
