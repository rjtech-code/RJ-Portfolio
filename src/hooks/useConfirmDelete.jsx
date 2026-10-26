import { useState } from "react";
import { ConfirmDialog } from "../Components/admin/ui";
import { useToast } from "./useToast";

// Delete flow with confirmation + real error reporting
export function useConfirmDelete(onDelete, describe) {
  const toast = useToast();
  const [target, setTarget] = useState(null);
  const [busy, setBusy] = useState(false);
  const dialog = (
    <ConfirmDialog
      open={Boolean(target)}
      message={target ? `${describe(target)} will be permanently deleted. This cannot be undone.` : ""}
      busy={busy}
      onCancel={() => setTarget(null)}
      onConfirm={async () => {
        setBusy(true);
        try {
          await onDelete(target);
          toast("Deleted.");
          setTarget(null);
        } catch (error) {
          toast(`Delete failed: ${error.message}`, "error");
        } finally {
          setBusy(false);
        }
      }}
    />
  );
  return [setTarget, dialog];
}

