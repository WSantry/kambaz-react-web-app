export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">

      <label htmlFor="wd-name">Assignment Name</label>
      <br />
      <input id="wd-name" value="A1 - ENV + HTML" />
      <br />
      <br />

      <label htmlFor="wd-description">Description</label>
      <br />
      <textarea id="wd-description" rows={5} cols={40}>
        The assignment is available online. Submit a link to the landing page of your project.
      </textarea>
      <br />

      <table>
        <tbody>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" value="100" />
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-group">
                <option value="Assignments">Assignments</option>
                <option value="Quizzes">Quizzes</option>
                <option value="Exams">Exams</option>
                <option value="Project">Project</option>
              </select>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </td>
            <td>
              <select id="wd-display-grade-as">
                <option value="points">Points</option>
                <option value="percentage">Percentage</option>
                <option value="letter">Letter Grade</option>
              </select>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select id="wd-submission-type">
                <option value="online">Online</option>
                <option value="onpaper">On Paper</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
            </td>
            <td>
              Online Entry Options
            </td>
          </tr>
          <tr>
            <td>
            </td>
            <td>
              <input id="wd-text-entry" type="checkbox" />
              <label htmlFor="wd-text-entry">Text Entry</label>
            </td>
          </tr>

          <tr>
            <td>
            </td>
            <td>
              <input id="wd-website-url" type="checkbox" />
              <label htmlFor="wd-website-url">Website URL</label>
            </td>
          </tr>

          <tr>
            <td>
            </td>
            <td>
              <input id="wd-media-recordings" type="checkbox" />
              <label htmlFor="wd-media-recordings">Media Recordings</label>
            </td>
          </tr>

          <tr>
            <td>
            </td>
            <td>
              <input id="wd-student-annotation" type="checkbox" />
              <label htmlFor="wd-student-annotation">Student Annotation</label>
            </td>
          </tr>

          <tr>
            <td>
            </td>
            <td>
              <input id="wd-file-upload" type="checkbox" />
              <label htmlFor="wd-file-upload">File Uploads</label>
            </td>
          </tr>


          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assign-to">Assign To</label>
            </td>
            <td>
              <select id="wd-assign-to">
                <option value="Everyone">Everyone</option>
                <option value="Teachers">Teachers</option>
                <option value="Students">Students</option>
              </select>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-due-date">Due Date</label>
            </td>
            <td>
              <input id="wd-due-date" type="date" defaultValue="2025-12-31" />
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-available-from">Available From</label>
            </td>
            <td>
              <input id="wd-available-from" type="date" defaultValue="2025-01-01" />
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-available-until">Available Until</label>
            </td>
            <td>
              <input id="wd-available-until" type="date" defaultValue="2025-12-31" />
            </td>
          </tr>
          <tr>
            <td>
              <hr />
            </td>
            <td>
              <hr />
            </td>
          </tr>
          <tr>
            <td>
            </td>
            <td  align="right" valign="top">
              <button>Cancel</button><button>Save</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
