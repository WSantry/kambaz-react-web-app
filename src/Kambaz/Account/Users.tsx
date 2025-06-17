// src/Kambaz/Account/Users.tsx
import { useEffect, useState, useRef } from "react";
import { useParams }                     from "react-router";
import { FormControl, Button }           from "react-bootstrap";
import { FaPlus }                        from "react-icons/fa6";

import PeopleTable                       from "../Courses/People/Table";
import * as client                       from "./client";

export default function Users() {
  /* router param so we refresh the list after drawer closes / deletes */
  const { uid } = useParams();

  /* local state */
  const [users, setUsers] = useState<any[]>([]);
  const [role,  setRole]  = useState<string>("");
  const [name,  setName]  = useState<string>("");

  /* load everything (or reload after /:uid changes) */
  const loadAll = async () => setUsers(await client.findAllUsers());
  useEffect(() => { loadAll(); }, [uid]);

  /* role filter */
  const filterByRole = async (r: string) => {
    setRole(r);
    r ? setUsers(await client.findUsersByRole(r)) : loadAll();
  };

  /* name filter with request‑guard */
  const latestReq = useRef(0);

  const filterByName = async (term: string) => {
    setName(term);
    if (!term) { loadAll(); return; }

    const myReq = ++latestReq.current;
    const data  = await client.findUsersByPartialName(term);
    if (myReq === latestReq.current) setUsers(data);
  };

  /* quick‑add (ADMIN use) */
  const addUser = async () => {
    const u = await client.createUser({
      firstName : "New",
      lastName  : `User${users.length + 1}`,
      username  : `newuser${Date.now()}`,
      password  : "password123",
      email     : `email${users.length + 1}@neu.edu`,
      section   : "S101",
      role      : "STUDENT",
    });
    setUsers([...users, u]);
  };

  /* ───────────── render ───────────── */
  return (
    <div id="wd-users-screen">
      <h3>Users</h3>

      <Button
        variant="danger"
        className="float-end mb-2"
        onClick={addUser}
      >
        <FaPlus className="me-2" />
        People
      </Button>

      <FormControl
        placeholder="Search people"
        className="float-start w-25 me-2"
        value={name}
        onChange={(e) => filterByName(e.target.value)}
      />

      <select
        value={role}
        onChange={(e) => filterByRole(e.target.value)}
        className="form-select float-start w-25"
      >
        <option value="">All Roles</option>
        <option value="STUDENT">Students</option>
        <option value="TA">Assistants</option>
        <option value="FACULTY">Faculty</option>
        <option value="ADMIN">Administrators</option>
      </select>

      <div className="clearfix mb-3" />

      <PeopleTable users={users} />
    </div>
  );
}
