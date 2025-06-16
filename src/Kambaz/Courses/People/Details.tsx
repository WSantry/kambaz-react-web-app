import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { FormControl, FormSelect } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { FaPencil, FaCheck } from "react-icons/fa6";

import * as client from "../../Account/client";

export default function PeopleDetails() {
  const { uid }   = useParams();                 // the user being viewed
  const navigate  = useNavigate();
  const { currentUser } = useSelector((s: any) => s.accountReducer);

  // ───── permissions: only ADMIN / FACULTY can edit ─────
  const canEdit = currentUser &&
                  (currentUser.role === "ADMIN" || currentUser.role === "FACULTY");

  // ───── canonical user record ─────
  const [user, setUser] = useState<any>(null);

  // controlled inputs for edits
  const [name,  setName]  = useState("");
  const [email, setEmail] = useState("");
  const [role,  setRole]  = useState("");

  // which field is being edited?
  const [editing, setEditing] =
    useState<"" | "name" | "email" | "role">("");

  /* ─────────── fetch on mount / uid change ─────────── */
  useEffect(() => {
    (async () => {
      if (!uid) return;
      const record = await client.findUserById(uid);
      setUser(record);
      setName(`${record.firstName ?? ""} ${record.lastName ?? ""}`.trim());
      setEmail(record.email ?? "");
      setRole(record.role  ?? "STUDENT");
    })();
  }, [uid]);

  if (!uid || !user) return null;               // nothing to render

  /* ─────────── helpers ─────────── */
  const saveName = async () => {
    if (!canEdit) return;
    const [firstName, ...lastArr] = name.trim().split(" ");
    const lastName = lastArr.join(" ");
    const updated = { ...user, firstName, lastName };
    await client.updateUser(updated);
    setUser(updated);
    setEditing("");
  };

  const saveEmail = async () => {
    if (!canEdit) return;
    const updated = { ...user, email };
    await client.updateUser(updated);
    setUser(updated);
    setEditing("");
  };

  const saveRole = async () => {
    if (!canEdit) return;
    const updated = { ...user, role };
    await client.updateUser(updated);
    setUser(updated);
    setEditing("");
  };

  const handleSave = () => {
    if (editing === "name")  return saveName();
    if (editing === "email") return saveEmail();
    if (editing === "role")  return saveRole();
  };

  const handleDelete = async (uid: string) => {
    if (!canEdit) return;
    if (!window.confirm("Delete this user?")) return;
    await client.deleteUser(uid);
    navigate(-1);                               // close drawer
  };

  /* ─────────── UI ─────────── */
  return (
    <div
      className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25"
      style={{ maxWidth: 420 }}
    >
      {/* close (X) */}
      <button
        className="btn position-absolute end-0 top-0"
        onClick={() => navigate(-1)}
      >
        <IoCloseSharp className="fs-1" />
      </button>

      {/* avatar */}
      <div className="text-center mt-2">
        <FaUserCircle className="text-secondary fs-1" />
      </div>
      <hr />

      {/* ───────────── NAME ───────────── */}
      <div className="fs-4 text-danger mb-3">
        {canEdit ? (
          editing !== "name" ? (
            <>
              <span
                className="wd-name"
                style={{ cursor: "pointer" }}
                onClick={() => setEditing("name")}
              >
                {user.firstName} {user.lastName}
              </span>
              <FaPencil
                className="ms-2 fs-5 mt-1 text-danger wd-edit"
                style={{ cursor: "pointer" }}
                onClick={() => setEditing("name")}
              />
            </>
          ) : (
            <>
              <FormControl
                autoFocus
                className="w-75 d-inline-block"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
              />
              <FaCheck
                className="ms-2 fs-5 mt-1 text-success wd-save"
                style={{ cursor: "pointer" }}
                onClick={handleSave}
              />
            </>
          )
        ) : (
          <span>{user.firstName} {user.lastName}</span>
        )}
      </div>

      {/* ───────────── EMAIL ───────────── */}
      <div className="mb-2">
        <b>Email:</b>{" "}
        {canEdit ? (
          editing !== "email" ? (
            <>
              <span className="wd-email">{user.email}</span>
              <FaPencil
                className="ms-1 text-danger wd-edit-email"
                style={{ cursor: "pointer" }}
                onClick={() => setEditing("email")}
              />
            </>
          ) : (
            <>
              <FormControl
                type="email"
                className="w-75 d-inline-block"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
              />
              <FaCheck
                className="ms-1 text-success wd-save-email"
                style={{ cursor: "pointer" }}
                onClick={handleSave}
              />
            </>
          )
        ) : (
          <span>{user.email}</span>
        )}
      </div>

      {/* ───────────── ROLE ───────────── */}
      <div className="mb-2">
        <b>Role:</b>{" "}
        {canEdit ? (
          editing !== "role" ? (
            <>
              <span className="wd-role">{user.role}</span>
              <FaPencil
                className="ms-1 text-danger wd-edit-role"
                style={{ cursor: "pointer" }}
                onClick={() => setEditing("role")}
              />
            </>
          ) : (
            <>
              <FormSelect
                className="w-50 d-inline-block"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="STUDENT">Student</option>
                <option value="TA">TA</option>
                <option value="FACULTY">Faculty</option>
                <option value="ADMIN">Admin</option>
              </FormSelect>
              <FaCheck
                className="ms-1 text-success wd-save-role"
                style={{ cursor: "pointer" }}
                onClick={handleSave}
              />
            </>
          )
        ) : (
          <span>{user.role}</span>
        )}
      </div>

      {/* read-only fields */}
      <div className="mb-2">
        <b>Login&nbsp;ID:</b> <span className="wd-login-id">{user.loginId}</span>
      </div>
      <div className="mb-2">
        <b>Section:</b> <span className="wd-section">{user.section}</span>
      </div>
      <div className="mb-2">
        <b>Total&nbsp;Activity:</b>{" "}
        <span className="wd-total-activity">{user.totalActivity}</span>
      </div>

      {/* separator & action buttons */}
      {canEdit && (
        <>
          <hr />
          <div className="d-flex justify-content-end gap-2">
            <button
              className="btn btn-secondary"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(user._id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
