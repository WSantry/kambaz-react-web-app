import { Button, Dropdown } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";

export default function Modules() {
  return (
    <div>
      <h2>Modules</h2>

      <div className="text-nowrap mb-5 position-relative">
        {/* Collapse All, View Progress, Publish All (dropdown), +Module */}
        <Button variant="secondary" size="lg" className="me-2" id="wd-collapse-all">
          Collapse All
        </Button>
        <Button variant="secondary" size="lg" className="me-2" id="wd-view-progress">
          View Progress
        </Button>

        <Dropdown className="me-2" style={{ display: "inline-block" }}>
          <Dropdown.Toggle variant="secondary" id="wd-publish-all-btn" size="lg">
            Publish All
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item id="wd-publish-all-modules-and-items">
              Publish All Modules & Items
            </Dropdown.Item>
            <Dropdown.Item id="wd-publish-modules-only">
              Publish Modules Only
            </Dropdown.Item>
            <Dropdown.Item id="wd-unpublish-all-modules-and-items">
              Unpublish All Modules & Items
            </Dropdown.Item>
            <Dropdown.Item id="wd-unpublish-modules-only">
              Unpublish Modules Only
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Button variant="danger" size="lg" id="wd-add-module-btn">
          <FaPlus className="me-1" />
          Module
        </Button>
      </div>

      {/* Example: 2 modules, each with lessons */}
      <div className="list-group">
        {/* Module #1 */}
        <div className="list-group-item p-0 mb-5 fs-5" style={{ border: "1px solid gray" }}>
          <div className="p-3 ps-2 bg-secondary text-dark">
            <BsGripVertical className="me-2 fs-4" />
            Week 1
            <ModuleControlButtons />
          </div>
          <div className="list-group">
            <div className="list-group-item p-3 ps-2" style={{ borderLeft: "3px solid green" }}>
              <BsGripVertical className="me-2 fs-4" />
              LEARNING OBJECTIVES
              <LessonControlButtons />
            </div>
            <div className="list-group-item p-3 ps-2" style={{ borderLeft: "3px solid green" }}>
              <BsGripVertical className="me-2 fs-4" />
              Introduction to the course
              <LessonControlButtons />
            </div>
          </div>
        </div>

        {/* Module #2 */}
        <div className="list-group-item p-0 mb-5 fs-5" style={{ border: "1px solid gray" }}>
          <div className="p-3 ps-2 bg-secondary text-dark">
            <BsGripVertical className="me-2 fs-4" />
            Week 2
            <ModuleControlButtons />
          </div>
          <div className="list-group">
            <div className="list-group-item p-3 ps-2" style={{ borderLeft: "3px solid green" }}>
              <BsGripVertical className="me-2 fs-4" />
              LESSON 1
              <LessonControlButtons />
            </div>
            <div className="list-group-item p-3 ps-2" style={{ borderLeft: "3px solid green" }}>
              <BsGripVertical className="me-2 fs-4" />
              LESSON 2
              <LessonControlButtons />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
