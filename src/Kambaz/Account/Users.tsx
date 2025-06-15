import { useEffect, useState } from "react";
import { useParams }           from "react-router";
import { FormControl, Button } from "react-bootstrap";
import { FaPlus }              from "react-icons/fa6";
import PeopleTable             from "../Courses/People/Table";
import * as client             from "./client";

export default function Users() {
  const { uid }  = useParams();
  const [users,setUsers] = useState<any[]>([]);
  const [role,setRole]   = useState("");
  const [name,setName]   = useState("");

  /* ───── helpers ───── */
  const loadAll = async ()=> setUsers(await client.findAllUsers());

  useEffect(()=>{ loadAll(); },[uid]);

  const filterByRole = async (r:string)=>{
    setRole(r);
    r ? setUsers(await client.findUsersByRole(r)) : loadAll();
  };

  const filterByName = async (n:string)=>{
    setName(n);
    n ? setUsers(await client.findUsersByPartialName(n)) : loadAll();
  };

  const addUser = async ()=>{
    const u = await client.createUser({
      firstName : "New",
      lastName  : `User${users.length+1}`,
      username  : `newuser${Date.now()}`,
      password  : "password123",
      email     : `email${users.length+1}@neu.edu`,
      section   : "S101",
      role      : "STUDENT",
    });
    setUsers([...users,u]);
  };

  return (
    <div id="wd-users-screen">
      <h3>Users</h3>

      <Button variant="danger" className="float-end mb-2" onClick={addUser}>
        <FaPlus className="me-2"/> Users
      </Button>

      <FormControl
        placeholder="Search people"
        className="float-start w-25 me-2"
        value={name}
        onChange={(e)=>filterByName(e.target.value)}
      />

      <select value={role} onChange={(e)=>filterByRole(e.target.value)}
              className="form-select float-start w-25">
        <option value="">All Roles</option>
        <option value="STUDENT">Students</option>
        <option value="TA">Assistants</option>
        <option value="FACULTY">Faculty</option>
        <option value="ADMIN">Administrators</option>
      </select>

      <div className="clearfix mb-3"></div>

      <PeopleTable users={users}/>
    </div>
  );
}
