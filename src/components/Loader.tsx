import { FaSpinner } from "react-icons/fa";

function Loader() {
  return (
    <div className="flex justify-center items-center gap-3 py-10">
      <FaSpinner className="animate-spin text-2xl" />
      <p>Cargando dragones...</p>
    </div>
  );
}

export default Loader;