import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import * as client from "./client";
import { setCurrentUser } from "./reducer";

export default function Session({ children }:{ children:any }) {
  const [pending,setPending] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try   { dispatch(setCurrentUser(await client.profile())); }
      catch {/* not signed in */}
      setPending(false);
    })();
  }, [dispatch]);

  return pending ? null : children;
}