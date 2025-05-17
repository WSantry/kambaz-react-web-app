import Modules from "../Modules";
import CourseStatus from "./Status";

export default function Home() {
  return (
    <div id="wd-home" className="d-flex">
      {/* left side: modules */}
      <div className="flex-fill me-3">
        <Modules />
      </div>

      {/* right side: course status (hide on narrower if desired) */}
      <div className="d-none d-xl-block">
        <CourseStatus />
      </div>
    </div>
  );
}
