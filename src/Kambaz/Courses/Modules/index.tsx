export default function Modules() {
  return (
    <div>
      <h2>Modules</h2>
      <button>Collapse All</button>
      <button>View Progress</button>
      <ul id="wd-modules">
        <li className="wd-module">
          <div className="wd-title">Week 1</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">Lecture 1</span>
              <ul className="wd-content">
                <li className="wd-content-item">Syllabus Overview</li>
                <li className="wd-content-item">Reading: Intro to Web Dev</li>
                <li className="wd-content-item">Slides: HTML Basics</li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 2</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">Lecture 2</span>
              <ul className="wd-content">
                <li className="wd-content-item">Reading: CSS Basics</li>
                <li className="wd-content-item">Slides: CSS Layout</li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 3</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">Lecture 3</span>
              <ul className="wd-content">
                <li className="wd-content-item">Reading: Intro to JavaScript</li>
                <li className="wd-content-item">Assignment: JavaScript Variables</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  )
}
