import { useEffect, useState } from "react";
import * as client             from "./client";

export default function HttpClient() {
  const [welcomeClick, setWelcomeClick] = useState("");
  const [welcomeLoad,  setWelcomeLoad]  = useState("");

  const fetchClick = async () => setWelcomeClick(await client.fetchWelcomeMessage());
  const fetchLoad  = async () => setWelcomeLoad(await client.fetchWelcomeMessage());

  useEffect(() => { fetchLoad(); }, []);

  return (
    <div id="wd-http-client">
      <h3>HTTP Client</h3><hr/>
      <h4>Requesting on Click</h4>
      <button className="btn btn-primary" onClick={fetchClick}>Fetch Welcome</button>
      <p className="mt-2">Response: <b>{welcomeClick}</b></p><hr/>
      <h4>Requesting on Load</h4>
      <p>Response: <b>{welcomeLoad}</b></p><hr/>
    </div>
  );
}
