import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { IoCalendarOutline } from "react-icons/io5";
import { FaInbox } from "react-icons/fa";

export default function KambazNavigation() {
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
      {/* Logo link to NEU */}
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

      {/* Account link -> black bg, white text */}
      <ListGroup.Item
        as={Link}
        to="/Kambaz/Account"
        className="text-center border-0 bg-black text-white"
      >
        <FaRegCircleUser className="fs-1 text-white" />
        <br />
        Account
      </ListGroup.Item>
      <br />

      {/* Dashboard link -> white bg, red text */}
      <ListGroup.Item
        as={Link}
        to="/Kambaz/Dashboard"
        className="text-center border-0 bg-white text-danger"
      >
        <AiOutlineDashboard className="fs-1 text-danger" />
        <br />
        Dashboard
      </ListGroup.Item>
      <br />

      {/* Courses link -> black bg, white text, red icon */}
      <ListGroup.Item
        as={Link}
        to="/Kambaz/Dashboard"
        className="bg-black text-white text-center border-0"
      >
        <LiaBookSolid className="fs-1 text-danger" />
        <br />
        Courses
      </ListGroup.Item>
      <br />

      {/* Calendar */}
      <ListGroup.Item
        as={Link}
        to="/Kambaz/Calendar"
        className="bg-black text-white text-center border-0"
      >
        <IoCalendarOutline className="fs-1 text-danger" />
        <br />
        Calendar
      </ListGroup.Item>
      <br />

      {/* Inbox */}
      <ListGroup.Item
        as={Link}
        to="/Kambaz/Inbox"
        className="bg-black text-white text-center border-0"
      >
        <FaInbox className="fs-1 text-danger" />
        <br />
        Inbox
      </ListGroup.Item>
      <br />

      {/* Link back to labs */}
      <ListGroup.Item
        as={Link}
        to="/Labs"
        className="bg-black text-white text-center border-0"
      >
        <LiaCogSolid className="fs-1 text-danger" />
        <br />
        Labs
      </ListGroup.Item>
    </ListGroup>
  );
}
