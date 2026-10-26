import { useEffect, useState } from "react";
import { adminApi } from "../services/adminApi";

// Loads an admin collection and exposes create/update/remove that keep the list in sync.
// Each mutation throws on failure so callers can show the real error (no fake success).
export function useAdminResource(resource) {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    adminApi
      .list(resource)
      .then((data) => {
        if (cancelled) return;
        setItems(data);
        setStatus("ready");
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message);
        setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [resource, reloadKey]);

  const reload = () => {
    setStatus("loading");
    setReloadKey((k) => k + 1);
  };

  const create = async (body) => {
    const created = await adminApi.create(resource, body);
    setItems((prev) => [created, ...prev]);
    return created;
  };

  const update = async (id, body) => {
    const updated = await adminApi.update(resource, id, body);
    setItems((prev) => prev.map((item) => (item._id === id ? updated : item)));
    return updated;
  };

  const remove = async (id) => {
    await adminApi.remove(resource, id);
    setItems((prev) => prev.filter((item) => item._id !== id));
  };

  return { items, status, error, reload, create, update, remove };
}
