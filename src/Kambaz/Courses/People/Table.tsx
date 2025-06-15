import { Table }         from "react-bootstrap";
import { FaUserCircle }  from "react-icons/fa";
import { Link }          from "react-router-dom";
import PeopleDetails     from "./Details";

export default function PeopleTable({ users=[] }:{ users?:any[] }){
  return (
    <div id="wd-people-table">
      <PeopleDetails/>

      <Table striped responsive>
        <thead>
          <tr>
            <th>Name</th><th>Login ID</th><th>Section</th>
            <th>Role</th><th>Last Activity</th><th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u=>(
            <tr key={u._id}>
              <td className="text-nowrap">
                <Link to={`/Kambaz/Account/Users/${u._id}`}
                      className="text-decoration-none text-dark">
                  <FaUserCircle className="me-2 text-secondary"/>
                  {u.firstName} {u.lastName}
                </Link>
              </td>
              <td>{u.loginId}</td><td>{u.section}</td><td>{u.role}</td>
              <td>{u.lastActivity}</td><td>{u.totalActivity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
