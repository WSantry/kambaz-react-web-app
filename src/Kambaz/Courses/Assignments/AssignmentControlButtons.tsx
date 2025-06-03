import { FaPlus } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";

export default function AssignmentControlButtons() {
  return (
    <div className="float-end d-flex align-items-center gap-2">
      <span className="badge rounded-pill border text-dark border-dark px-3 py-1 bg-transparent">
        40% of Total
      </span>
      <FaPlus />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
