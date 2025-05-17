import { FaPlus } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";

export default function ModuleControlButtons() {
  return (
    <span className="float-end">
      <FaPlus className="me-3" />
      <IoEllipsisVertical className="fs-4" />
    </span>
  );
}
