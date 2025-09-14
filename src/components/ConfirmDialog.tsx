import type { ReactNode } from 'react'
import './ConfirmDialog.css'

interface ConfirmDialogProps {
  /** Whether the dialog is currently visible. */
  open: boolean
  /** Heading shown at the top of the dialog. */
  title: string
  /** Body text explaining what will happen. */
  message: ReactNode
  /** Called when the user confirms the action. */
  onConfirm: () => void
  /** Called when the user cancels or dismisses the dialog. */
  onCancel: () => void
}

/**
 * Generic confirmation dialog rendered as a modal overlay.
 *
 * Renders nothing when `open` is false. When open, shows a title, message and
 * Cancel / Confirm buttons. The confirm button is styled as destructive.
 */
export default function ConfirmDialog({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) {
    return null
  }

  return (
    <div
      className="confirm-dialog-overlay"
      role="presentation"
      onMouseDown={(event) => {
        // Clicking the backdrop (outside the panel) cancels the dialog.
        if (event.target === event.currentTarget) {
          onCancel()
        }
      }}
    >
      <div
        className="confirm-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-message"
      >
        <h2 id="confirm-dialog-title" className="confirm-dialog-title">
          {title}
        </h2>
        <div id="confirm-dialog-message" className="confirm-dialog-message">
          {message}
        </div>
        <div className="confirm-dialog-actions">
          <button
            type="button"
            className="confirm-dialog-button confirm-dialog-cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="confirm-dialog-button confirm-dialog-confirm"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}
