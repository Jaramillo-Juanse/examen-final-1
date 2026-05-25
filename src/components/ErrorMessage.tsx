import { FaExclamationTriangle } from "react-icons/fa";

type ErrorMessageProps = {
  message: string;
  onRetry: () => void;
};

function ErrorMessage({
  message,
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className="text-center py-10">
      <FaExclamationTriangle className="mx-auto text-red-500 text-3xl mb-3" />

      <p className="mb-4">{message}</p>

      <button
        onClick={onRetry}
        className="bg-red-600 px-4 py-2 rounded"
      >
        Reintentar
      </button>
    </div>
  );
}

export default ErrorMessage;