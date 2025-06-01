import { FaPlus } from "react-icons/fa6";
import { Button, Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"; 

export default function AssignmentControls() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div className="d-flex mb-3 align-items-center">
      <div className="me-auto position-relative" style={{ width: "250px" }}>
        <FaSearch
          className="text-secondary"
          style={{
            position: "absolute",
            top: "50%",
            left: "12px",
            transform: "translateY(-50%)",
            pointerEvents: "none",
          }}
        />
        <Form.Control
          type="text"
          placeholder="Search..."
          className="ps-5"
          style={{ backgroundColor: "white" }}
        />
      </div>

      {currentUser.role === "FACULTY" && (
        <>
          <Button variant="secondary" className="me-2 d-flex align-items-center">
            <FaPlus className="me-1" />
            Group
          </Button>
          <Button
            as={Link as any}
            to="new"
            variant="danger"
            className="d-flex align-items-center"
          >
            <FaPlus className="me-1" />
            Assignment
          </Button>
        </>
      )}
    </div>
  );
}
