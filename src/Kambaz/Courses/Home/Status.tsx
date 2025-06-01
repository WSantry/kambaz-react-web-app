import { Button } from "react-bootstrap";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiBell } from "react-icons/bi";
import { LiaChartBarSolid } from "react-icons/lia";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { BsHouse } from "react-icons/bs";
import { BsBook } from "react-icons/bs"
import { BsMegaphone } from "react-icons/bs";
import { useSelector } from "react-redux";

export default function CourseStatus() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  return (
    <div id="wd-course-status" style={{ width: "300px" }}>
      <h2>Course Status</h2>
      {currentUser.role === "FACULTY" && (
        <>
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

          <Button
            variant="secondary"
            size="lg"
            className="w-100 mb-2 text-start"
          >
            <BiImport className="me-2 fs-5" />
            Import Existing Content
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="w-100 mb-2 text-start"
          >
            <LiaFileImportSolid className="me-2 fs-5" />
            Import from Commons
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="w-100 mb-2 text-start"
          >
            <BsHouse className="me-2 fs-5" />
            Choose Home Page
          </Button>
        </>
      )}
      <Button variant="secondary" size="lg" className="w-100 mb-2 text-start">
        <BsBook className="me-2 fs-5" />
        View Course Screen
      </Button>
      <Button variant="secondary" size="lg" className="w-100 mb-2 text-start">
        <BsMegaphone className="me-2 fs-5" />
        New Announcement
      </Button>
      <Button variant="secondary" size="lg" className="w-100 mb-2 text-start">
        <LiaChartBarSolid className="me-2 fs-5" />
        New Analytics
      </Button>
      <Button variant="secondary" size="lg" className="w-100 mb-2 text-start">
        <BiBell className="me-2 fs-5" />
        View Course Notifications
      </Button>
    </div>
  );
}
