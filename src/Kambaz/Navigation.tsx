import { ListGroup } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { IoCalendarOutline } from "react-icons/io5";
import { FaInbox } from "react-icons/fa";

export default function KambazNavigation() {
  const { pathname } = useLocation();

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
          pathname.startsWith("/Kambaz/Account") ? "bg-white text-danger" : "bg-black text-white"
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

      {/* Dashboard */}
      <ListGroup.Item
        as={Link}
        to="/Kambaz/Dashboard"
        className={`text-center border-0 ${
          pathname === "/Kambaz/Dashboard" ? "bg-white text-danger" : "bg-black text-white"
        }`}
      >
        <AiOutlineDashboard
          className={`fs-1 ${
            pathname === "/Kambaz/Dashboard" ? "text-danger" : "text-danger"
          }`}
        />
        <br />
        Dashboard
      </ListGroup.Item>
      <br />

      {/* Courses */}
      <ListGroup.Item
        as={Link}
        to="/Kambaz/Dashboard"
        className={`text-center border-0 ${
          pathname.startsWith("/Kambaz/Courses") ? "bg-white text-danger" : "bg-black text-white"
        }`}
      >
        <LiaBookSolid
          className={`fs-1 ${
            pathname.startsWith("/Kambaz/Courses") ? "text-danger" : "text-danger"
          }`}
        />
        <br />
        Courses
      </ListGroup.Item>
      <br />

      {/* Calendar */}
      <ListGroup.Item
        as={Link}
        to="/Kambaz/Calendar"
        className={`text-center border-0 ${
          pathname === "/Kambaz/Calendar" ? "bg-white text-danger" : "bg-black text-white"
        }`}
      >
        <IoCalendarOutline
          className={`fs-1 ${
            pathname === "/Kambaz/Calendar" ? "text-danger" : "text-danger"
          }`}
        />
        <br />
        Calendar
      </ListGroup.Item>
      <br />

      {/* Inbox */}
      <ListGroup.Item
        as={Link}
        to="/Kambaz/Inbox"
        className={`text-center border-0 ${
          pathname === "/Kambaz/Inbox" ? "bg-white text-danger" : "bg-black text-white"
        }`}
      >
        <FaInbox
          className={`fs-1 ${
            pathname === "/Kambaz/Inbox" ? "text-danger" : "text-danger"
          }`}
        />
        <br />
        Inbox
      </ListGroup.Item>
      <br />

      {/* Labs */}
      <ListGroup.Item
        as={Link}
        to="/Labs"
        className={`text-center border-0 ${
          pathname === "/Labs" ? "bg-white text-danger" : "bg-black text-white"
        }`}
      >
        <LiaCogSolid
          className={`fs-1 ${
            pathname === "/Labs" ? "text-danger" : "text-danger"
          }`}
        />
        <br />
        Labs
      </ListGroup.Item>
    </ListGroup>
  );
}
