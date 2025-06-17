// src/Kambaz/Account/Session.tsx
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import * as accountClient      from "./client";
import { setCurrentUser }      from "./reducer";

import * as enrollClient       from "../Courses/Enrollments/client";
import { setEnrollments }      from "../Courses/Enrollments/reducer";

export default function Session({ children }: { children: any }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        // 1. Who am I?
        const user = await accountClient.profile();
        if (user) {
          dispatch(setCurrentUser(user));

          // 2. What courses am I enrolled in?
          const list = await enrollClient.fetchMyEnrollments();
          dispatch(setEnrollments(list));
        }
      } catch {
        /* not signed-in is fine – currentUser stays null */
      } finally {
        setPending(false);       // unblock the app only after we tried both calls
      }
    })();
  }, [dispatch]);

  return pending ? null : children;
}
