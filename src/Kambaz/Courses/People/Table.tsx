import { useEffect, useState } from "react";
import { useParams, Link }     from "react-router-dom";
import { Table, Spinner }      from "react-bootstrap";
import { FaUserCircle }        from "react-icons/fa";

import PeopleDetails           from "./Details";
import * as courseClient       from "../client";

type Props = { users?: any[] };

export default function PeopleTable({ users: propUsers = [] }: Props) {
  const { cid } = useParams();                             // course id from URL

  /* local copy of the roster */
  const [users,   setUsers]   = useState<any[]>(propUsers);
  const [loading, setLoading] = useState<boolean>(!propUsers.length);

  /* ─── keep local state in sync if parent later hands data ─── */
  useEffect(() => {
    if (propUsers.length) {
      setUsers(propUsers);
      setLoading(false);
    }
  }, [propUsers]);

  /* ─── fetch roster ONLY when parent didn’t supply one ─── */
  useEffect(() => {
    if (propUsers.length || !cid) return;                  // nothing to fetch
    (async () => {
      setLoading(true);
      try   { setUsers(await courseClient.findUsersForCourse(cid)); }
      finally { setLoading(false); }
    })();
  }, [cid]);                                              // run once per cid

  /* ─────────────────────────── render ─────────────────────────── */
  return (
    <div id="wd-people-table" className="position-relative">
      {/* slide-out drawer */}
      <PeopleDetails />

      {loading ? (
        <Spinner animation="border" className="m-3" />
      ) : users.length === 0 ? (
        <div className="m-3 text-muted">No people found for this course.</div>
      ) : (
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
              /* keep course context for students / faculty, fall back to
                 admin Users page when we’re outside a course route            */
              const path = cid
                ? `/Kambaz/Courses/${cid}/People/${u._id}`
                : `/Kambaz/Account/Users/${u._id}`;

              return (
                <tr key={u._id}>
                  <td className="text-nowrap">
                    <Link to={path} className="text-decoration-none text-dark">
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
      )}
    </div>
  );
}
