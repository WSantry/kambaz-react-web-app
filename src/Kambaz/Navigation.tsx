import { ListGroup } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { IoCalendarOutline } from "react-icons/io5";
import { FaInbox } from "react-icons/fa";

export default function KambazNavigation() {
  const { pathname } = useLocation();

  // Define navigation links (except NEU logo and Account)
  const links = [
    {
      label: "Dashboard",
      path: "/Kambaz/Dashboard",
      icon: AiOutlineDashboard,
      isActive: pathname === "/Kambaz/Dashboard",
    },
    {
      label: "Courses",
      path: "/Kambaz/Dashboard", 
      icon: LiaBookSolid,
      isActive: pathname.startsWith("/Kambaz/Courses"),
    },
    {
      label: "Calendar",
      path: "/Kambaz/Calendar",
      icon: IoCalendarOutline,
      isActive: pathname === "/Kambaz/Calendar",
    },
    {
      label: "Inbox",
      path: "/Kambaz/Inbox",
      icon: FaInbox,
      isActive: pathname === "/Kambaz/Inbox",
    },
    {
      label: "Labs",
      path: "/Labs",
      icon: LiaCogSolid,
      isActive: pathname === "/Labs",
    },
  ];

  return (
    <ListGroup
      id="wd-kambaz-navigation"
      style={{ width: 120 }}
      className="
        rounded-0
        position-fixed
        bottom-0 top-0
        d-none d-md-block
        bg-black
        z-2
      "
    >
      {/* NEU logo */}
      <ListGroup.Item
        id="wd-neu-link"
        action
        href="https://www.northeastern.edu/"
        target="_blank"
        className="bg-black border-0 text-center"
      >
        <img src="/images/NEU.png" alt="NEU" width="75" />
      </ListGroup.Item>
      <br />

      {/* Account */}
      <ListGroup.Item
        as={Link}
        to="/Kambaz/Account"
        className={`text-center border-0 ${
          pathname.startsWith("/Kambaz/Account")
            ? "bg-white text-danger"
            : "bg-black text-white"
        }`}
      >
        <FaRegCircleUser
          className={`fs-1 ${
            pathname.startsWith("/Kambaz/Account") ? "text-danger" : "text-white"
          }`}
        />
        <br />
        Account
      </ListGroup.Item>
      <br />

      {/* Other navigation items */}
      {links.map(({ label, path, icon: Icon, isActive }) => (
        <ListGroup.Item
          key={label}
          as={Link}
          to={path}
          className={`text-center border-0 ${
            isActive ? "bg-white text-danger" : "bg-black text-white"
          }`}
        >
          <Icon className={`fs-1 ${isActive ? "text-danger" : "text-danger"}`} />
          <br />
          {label}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
