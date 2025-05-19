import { FaPlus } from "react-icons/fa6";

import { Button, Form } from "react-bootstrap";

import { FaSearch } from "react-icons/fa";
export default function AssignmentControls() {
 return (
   //<div id="wd-modules-controls" className="text-nowrap">
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

        <Button variant="secondary" className="me-2 d-flex align-items-center">
          <FaPlus className="me-1" />
          Group
        </Button>
        <Button variant="danger" className="d-flex align-items-center">
          <FaPlus className="me-1" />
          Assignment
        </Button>
      </div>
);}
