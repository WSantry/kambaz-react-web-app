import React from "react";   
import { Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * Wrap any component that should only be reachable
 * by users enrolled in the `:cid` course route.
 *
 * Usage:
 *   <EnrolledRoute><Courses /></EnrolledRoute>
 */
export default function EnrolledRoute({
  children,
}: {
  children: React.ReactElement;
}) {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);

  const isEnrolled = enrollments.some(
    (e: any) => e.user === currentUser?._id && e.course === cid
  );

  return isEnrolled ? children : <Navigate to="/Kambaz/Dashboard" replace />;
}
