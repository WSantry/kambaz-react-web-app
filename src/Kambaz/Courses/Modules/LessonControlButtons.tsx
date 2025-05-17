import { IoEllipsisVertical } from "react-icons/io5";
import { FaCheckCircle, FaCircle } from "react-icons/fa";

export default function LessonControlButtons() {
  // The green checkmark trick
  return (
    <span className="float-end">
      {/* Stacked circles to create a green check + white circle behind it */}
      <span className="position-relative me-2">
        <FaCheckCircle
          style={{ position: "absolute", top: 0, left: 0 }}
          className="text-success"
        />
        <FaCircle style={{ opacity: 0 }} />
      </span>
      <IoEllipsisVertical className="fs-4" />
    </span>
  );
}
