// src/Kambaz/Courses/People/Table.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Table, Spinner } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

import * as courseClient from "../client";

const EMPTY_USERS: any[] = [];

type Props = { users?: any[] };

export default function PeopleTable({ users: propUsers = EMPTY_USERS }: Props) {
  const { cid, uid } = useParams();

  /* local copy of the roster */
  const [users, setUsers] = useState<any[]>(propUsers);
  const [loading, setLoading] = useState<boolean>(propUsers.length === 0);

  /* resync when parent hands us a NEW array */
  useEffect(() => {
    setUsers(propUsers);
    setLoading(false);
  }, [propUsers]);                     // ← depend on array identity

  /* fetch roster only if parent didn’t supply one */
  useEffect(() => {
    // run only when the drawer is CLOSED (uid is undefined)
    if (uid || propUsers.length || !cid) return;
    (async () => {
      setLoading(true);
      try { setUsers(await courseClient.findUsersForCourse(cid)); }
      finally { setLoading(false); }
    })();
  }, [cid, uid, propUsers.length]);

  /* ------------- render ------------- */
  if (loading) {
    return (
      <div id="wd-people-table" className="m-3">
        <Spinner animation="border" />
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div id="wd-people-table" className="m-3 text-muted">
        No people found{cid ? " for this course." : "."}
      </div>
    );
  }

  return (
    <div id="wd-people-table">
      <Table striped responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login&nbsp;ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last&nbsp;Activity</th>
            <th>Total&nbsp;Activity</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u: any) => {
            const path = cid
              ? `/Kambaz/Courses/${cid}/People/${u._id}`
              : `/Kambaz/Account/Users/${u._id}`;
            return (
              <tr key={u._id}>
                <td className="text-nowrap">
                  <Link
                    to={
                      cid
                        ? `/Kambaz/Courses/${cid}/People/${u._id}`
                        : `/Kambaz/Account/Users/${u._id}`
                    }
                    replace={Boolean(uid)}              // ← key line: replace instead of push
                    className="text-decoration-none text-dark"
                  >
                    <FaUserCircle className="me-2 text-secondary" />
                    {u.firstName} {u.lastName}
                  </Link>
                </td>
                <td>{u.loginId}</td>
                <td>{u.section}</td>
                <td>{u.role}</td>
                <td>{u.lastActivity}</td>
                <td>{u.totalActivity}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
