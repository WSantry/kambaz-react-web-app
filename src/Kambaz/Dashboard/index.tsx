import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2>
      <hr />

      <div id="wd-dashboard-courses">
        {/* 7 sample courses */}
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home" className="wd-dashboard-course-link">
            <img src="/images/reactjs.jpg" width={200} alt="React" />
            <div>
              <h5>CS1234 React JS</h5>
              <p className="wd-dashboard-course-title">Full Stack Development</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/2345/Home" className="wd-dashboard-course-link">
            <img src="/images/nodejs.png" width={200} alt="NodeJS" />
            <div>
              <h5>CS2345 Node JS</h5>
              <p className="wd-dashboard-course-title">Server-side Development</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/3456/Home" className="wd-dashboard-course-link">
            <img src="/images/mongodb.png" width={200} alt="MongoDB" />
            <div>
              <h5>CS3456 MongoDB</h5>
              <p className="wd-dashboard-course-title">Database Systems</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/4567/Home" className="wd-dashboard-course-link">
            <img src="/images/express.png" width={200} alt="Express" />
            <div>
              <h5>CS4567 Express</h5>
              <p className="wd-dashboard-course-title">RESTful APIs</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/5678/Home" className="wd-dashboard-course-link">
            <img src="/images/typescript.png" width={200} alt="TypeScript" />
            <div>
              <h5>CS5678 TypeScript</h5>
              <p className="wd-dashboard-course-title">Typed JavaScript</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/6789/Home" className="wd-dashboard-course-link">
            <img src="/images/html.png" width={200} alt="HTML" />
            <div>
              <h5>CS6789 HTML &amp; CSS</h5>
              <p className="wd-dashboard-course-title">Front-end Web Dev</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/7890/Home" className="wd-dashboard-course-link">
            <img src="/images/python.png" width={200} alt="Python" />
            <div>
              <h5>CS7890 Python</h5>
              <p className="wd-dashboard-course-title">Backend Scripting</p>
              <button>Go</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
