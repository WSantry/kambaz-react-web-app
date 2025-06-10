import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import * as client from "./client";

export default function PeopleTable() {
  const { cid } = useParams<{ cid: string }>();
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      if (cid) {
        const data = await client.fetchUsersForCourse(cid);
        setUsers(data);
      }
    })();
  }, [cid]);

  return (
    <div id="wd-people-table">
      <Table striped responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td className="text-nowrap">
                <FaUserCircle className="me-2 fs-5 text-secondary" />
                {u.firstName} {u.lastName}
              </td>
              <td>{u.loginId}</td>
              <td>{u.section}</td>
              <td>{u.role}</td>
              <td>{u.lastActivity}</td>
              <td>{u.totalActivity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
