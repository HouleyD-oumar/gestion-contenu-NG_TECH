import Modal from './Modal';

interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog = ({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) => (
  <Modal open={open} onClose={onCancel}>
    <h2>{title}</h2>
    <p>{message}</p>
    <button onClick={onConfirm}>Confirmer</button>
    <button onClick={onCancel}>Annuler</button>
  </Modal>
);

export default ConfirmationDialog;