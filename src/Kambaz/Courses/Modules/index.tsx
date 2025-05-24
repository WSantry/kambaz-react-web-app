import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import ModulesControls from "./ModulesControls";
import { ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {modules} from "../../Database";

export default function Modules() {
  const { cid } = useParams();
  const filteredModules = modules.filter(m => m.course === cid);
  return (
    <div>
      <ModulesControls />
      <br /><br /><br /><br />
      <ListGroup className="rounded-0" id="wd-modules">
        {filteredModules.map(module => (
          <ListGroup.Item
            key={module.name}
            className="wd-module p-0 mb-5 fs-5 border-gray"
          >
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              {module.name}
              <ModuleControlButtons />
            </div>

            {/* LESSONS */}
            {module.lessons && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map(lesson => (
                  <ListGroup.Item
                    key={lesson.name}
                    className="wd-lesson p-3 ps-1"
                  >
                    <BsGripVertical className="me-2 fs-3" />
                    {lesson.name}
                    <LessonControlButtons />
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
