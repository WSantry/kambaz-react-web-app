import { MdBlock } from "react-icons/md";
import { FaCircle } from "react-icons/fa";
export default function BlackBlock() {
  return (
    <span className="me-1 position-relative">
      <MdBlock style={{ top: "2px" }} className="text-black me-1 position-absolute fs-5" />
      <FaCircle className="text-white me-1 fs-6" />
    </span>);}