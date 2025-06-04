import EnvironmentVariables            from "./EnvironmentVariables";
import PathParameters                   from "./PathParameters";
import QueryParameters                  from "./QueryParameters";
import WorkingWithObjects               from "./WorkingWithObjects";
import WorkingWithArrays                from "./WorkingWithArrays";
import HttpClient                       from "./HttpClient";
import WorkingWithObjectsAsynchronously from "./WorkingWithObjectsAsynchronously";
import WorkingWithArraysAsynchronously  from "./WorkingWithArraysAsynchronously";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export default function Lab5() {
  return (
    <div id="wd-lab5">
      <h2>Lab 5</h2>

      {/* quick sanity link */}
      <div className="list-group mb-3">
        <a href={`${REMOTE_SERVER}/lab5/welcome`} className="list-group-item">Welcome</a>
      </div>

      {/* sub-components */}
      <EnvironmentVariables />
      <PathParameters />
      <QueryParameters />
      <WorkingWithObjects />
      <WorkingWithArrays />
      <HttpClient />
      <WorkingWithObjectsAsynchronously />
      <WorkingWithArraysAsynchronously />
    </div>
  );
}
