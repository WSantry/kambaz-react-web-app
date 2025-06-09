import { useState } from "react";
import { FormControl } from "react-bootstrap";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ASSIGN_API = `${REMOTE_SERVER}/lab5/assignment`;
const MODULE_API = `${REMOTE_SERVER}/lab5/module`;

export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        title: "NodeJS Assignment"
    });
    const [moduleObj, setModuleObj] = useState({
        name: "Introduction to NodeJS"
    });

    return (
        <div id="wd-working-with-objects">
            <h3>Working With Objects</h3>

            {/* retrieve */}
            <h4>Retrieving Objects</h4>
            <a id="wd-retrieve-assignments" className="btn btn-primary"
                href={`${REMOTE_SERVER}/lab5/assignment`}>
                Get Assignment
            </a><hr />
            <h4>Retrieving Properties</h4>
            <a id="wd-retrieve-assignment-title" className="btn btn-primary"
                href={`${REMOTE_SERVER}/lab5/assignment/title`}>
                Get Title
            </a><hr />

            {/* update assignment title */}
            <h4>Modifying Assignment Title</h4>
            <a id="wd-update-assignment-title" className="btn btn-primary float-end"
                href={`${ASSIGN_API}/title/${assignment.title}`}>Update Title</a>
            <FormControl id="wd-assignment-title" className="w-75"
                defaultValue={assignment.title}
                onChange={e => setAssignment({ ...assignment, title: e.target.value })} />
            <hr />

            {/* module links */}
            <h4>Module</h4>
            <a id="wd-retrieve-module" className="btn btn-secondary me-2" href={MODULE_API}>Get Module</a>
            <a id="wd-retrieve-module-name" className="btn btn-secondary me-2" href={`${MODULE_API}/name`}>Get Module Name</a>
            <hr />

            <h4>Modifying Module Name</h4>
            <a id="wd-update-module-name" className="btn btn-secondary float-end"
                href={`${MODULE_API}/name/${moduleObj.name}`}>Update Name</a>
            <FormControl id="wd-module-name" className="w-75"
                value={moduleObj.name}
                onChange={e => setModuleObj({ ...moduleObj, name: e.target.value })} />
            <hr />
        </div>
    );
}
