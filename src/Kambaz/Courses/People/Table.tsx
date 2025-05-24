import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { users, enrollments } from "../../Database";

export default function PeopleTable() {
  const { cid } = useParams();

  // 1) Find all the enrollments for the given course
  const enrolledUserIds = enrollments
    .filter((enrollment) => enrollment.course === cid)
    .map((enrollment) => enrollment.user); 

  // 2) Filter users to only those whose _id is in that array
  const courseUsers = users.filter((usr) =>
    enrolledUserIds.includes(usr._id)
  );

  return (
    <div id="wd-people-table">
      <Table striped>
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
          {courseUsers.map((user) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-4 text-secondary" />
                {user.firstName} {user.lastName}
              </td>
              <td>{user.loginId}</td>
              <td>{user.section}</td>
              <td>{user.role}</td>
              <td>{user.lastActivity}</td>
              <td>{user.totalActivity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
