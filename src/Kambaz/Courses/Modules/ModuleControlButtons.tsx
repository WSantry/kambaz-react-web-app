import { FaPlus } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { useSelector } from "react-redux";

export default function ModuleControlButtons({ moduleId, deleteModule, editModule }: {
  moduleId: string; deleteModule: (moduleId: string) => void;
  editModule: (moduleId: string) => void
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  return (
    <div className="float-end">
      {currentUser.role === "FACULTY" && (
        <>
          <FaPencil
            style={{ cursor: "pointer" }}
            onClick={() => editModule(moduleId)}
            className="text-primary me-1"
          />
          <FaTrash
            style={{ cursor: "pointer" }}
            className="text-danger me-1"
            onClick={() => {
              const ok = window.confirm(
                "Are you sure you want to delete this module?"
              );
              if (ok) {
                deleteModule(moduleId);
              }
            }}
          />
        </>
      )}
      <GreenCheckmark />
      <FaPlus />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
