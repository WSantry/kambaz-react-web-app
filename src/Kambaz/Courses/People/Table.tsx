import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

export default function PeopleTable() {
  return (
    <div id="wd-people-table">
      <h2>People</h2>
      <Table striped>
        <thead>
          <tr>
            <th>Name</th><th>Login ID</th><th>Section</th><th>Role</th><th>Last Activity</th><th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <FaUserCircle className="me-2 fs-4 text-secondary" />
              Tony Stark
            </td>
            <td>001234561S</td>
            <td>S101</td>
            <td>STUDENT</td>
            <td>2020-10-01</td>
            <td>10:21:32</td>
          </tr>
          <tr>
            <td>
              <FaUserCircle className="me-2 fs-4 text-secondary" />
              Bruce Wayne
            </td>
            <td>001234562B</td>
            <td>S101</td>
            <td>STUDENT</td>
            <td>2020-10-02</td>
            <td>09:11:22</td>
          </tr>
          <tr>
            <td>
              <FaUserCircle className="me-2 fs-4 text-secondary" />
              Natasha Romanoff
            </td>
            <td>001234563N</td>
            <td>S101</td>
            <td>STUDENT</td>
            <td>2020-10-03</td>
            <td>11:59:59</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
