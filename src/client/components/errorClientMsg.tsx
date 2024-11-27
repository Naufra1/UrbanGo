import Button from "../components/button";

type ErrorMsgClientType = {
  isOpen: boolean;
  onClose: () => void;
  error_code: string;
  error_description: string;
};

export default function ErrorModal({
  isOpen,
  onClose,
  error_code,
  error_description,
}: ErrorMsgClientType) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-div" onClick={onClose}>
      <div className="modal-main-content" onClick={(e) => e.stopPropagation()}>
        <div className="error-code">{error_code}</div>
        <div className="error-body">
          <div className="error-description">{error_description}</div>
          <Button name="Fechar" handleOnClick={onClose} />
        </div>
      </div>
    </div>
  );
}
