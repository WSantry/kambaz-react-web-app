import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { BsGripVertical } from "react-icons/bs";
import { ListGroup, FormControl } from "react-bootstrap";

import ModulesControls        from "./ModulesControls";
import ModuleControlButtons    from "./ModuleControlButtons";
import LessonControlButtons    from "./LessonControlButtons";

import {
  addModule,
  editModule,
  updateModule,
  deleteModule,
  setModules,
} from "./reducer";

import * as coursesClient  from "../client";
import * as modulesClient  from "./client";

export default function Modules() {
  const { cid }           = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules }       = useSelector((s: any) => s.modulesReducer);
  const dispatch          = useDispatch();

  /* ───── fetch on mount / cid change ───── */
  useEffect(() => {
    (async () => {
      if (cid) {
        const mods = await coursesClient.findModulesForCourse(cid);
        dispatch(setModules(mods));
      }
    })();
  }, [cid, dispatch]);

  /* ───── CRUD helpers ───── */
  const createModuleForCourse = async () => {
    if (!cid) return;
    const mod = await coursesClient.createModuleForCourse(cid, { name: moduleName });
    dispatch(addModule(mod));
    setModuleName("");
  };

  const removeModule = async (mid: string) => {
    await modulesClient.deleteModule(mid);
    dispatch(deleteModule(mid));
  };

  const saveModule = async (m: any) => {
    await modulesClient.updateModule(m); // persist to server
    dispatch(updateModule(m));           // update Redux slice
  };

  /* ───── render ───── */
  return (
    <div className="wd-modules">
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={createModuleForCourse}
      />

      <br /><br /><br /><br />

      <ListGroup className="rounded-0" id="wd-modules">
        {modules.map((module: any) => (
          <ListGroup.Item
            key={module._id}
            className="wd-module p-0 mb-5 fs-5 border-gray"
          >
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />

              {/* —— Module title —— */}
              {!module.editing && module.name}

              {module.editing && (
                <FormControl
                  className="w-50 d-inline-block"
                  value={module.name}
                  onChange={(e) =>
                    dispatch(updateModule({ ...module, name: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      saveModule({
                        ...module,
                        name: e.currentTarget.value,
                        editing: false,
                      });
                    }
                  }}
                />
              )}

              {/* buttons */}
              <ModuleControlButtons
                moduleId={module._id}
                deleteModule={removeModule}
                editModule={(mid) => dispatch(editModule(mid))}
              />
            </div>

            {/* lessons */}
            {module.lessons?.length > 0 && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson: any) => (
                  <ListGroup.Item
                    key={lesson._id}
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
