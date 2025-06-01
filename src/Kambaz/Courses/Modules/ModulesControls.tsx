import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { Button, Dropdown } from "react-bootstrap";
import BlackBlock from "./BlackBlock";
import ModuleEditor from "./ModuleEditor";
import { useState } from "react";
import { useSelector } from "react-redux";
export default function ModulesControls(
  { moduleName, setModuleName, addModule }:
    { moduleName: string; setModuleName: (title: string) => void; addModule: () => void; }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div id="wd-modules-controls" className="text-nowrap">
      {currentUser.role === "FACULTY" && (
        <>
          <Button
            variant="danger"
            onClick={handleShow}
            size="lg"
            className="me-1 float-end"
            id="wd-add-module-btn"
          >
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Module
          </Button>

          <Dropdown className="float-end me-2">
            <Dropdown.Toggle
              variant="secondary"
              id="wd-publish-all-btn"
              size="lg"
            >
              <GreenCheckmark /> Publish All
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item id="wd-publish-all-modules-and-items">
                <GreenCheckmark /> Publish All Modules & Items
              </Dropdown.Item>
              <Dropdown.Item id="wd-publish-modules-only">
                <GreenCheckmark /> Publish Modules Only
              </Dropdown.Item>
              <Dropdown.Item id="wd-unpublish-all-modules-and-items">
                <BlackBlock /> Unpublish All Modules & Items
              </Dropdown.Item>
              <Dropdown.Item id="wd-unpublish-modules-only">
                <BlackBlock /> Unpublish Modules Only
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
      )}
      <Button variant="secondary" size="lg" className="float-end me-2" id="wd-view-progress">
        View Progress
      </Button>
      <Button variant="secondary" size="lg" className="float-end me-2" id="wd-collapse-all">
        Collapse All
      </Button>
      <ModuleEditor show={show} handleClose={handleClose} dialogTitle="Add Module"
        moduleName={moduleName} setModuleName={setModuleName} addModule={addModule} />
    </div>
  );
}
