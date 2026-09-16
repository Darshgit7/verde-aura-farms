import React, { useEffect, useState } from "react";
import { ArrowLeft, LogOut, Search, RefreshCw } from "lucide-react";

export default function AdminApp() {
  const apiBase = import.meta.env.VITE_API_BASE_URL || "";
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const login = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const r = await fetch(`${apiBase}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d.detail || d.message || "Login failed.");
      setToken(d.accessToken);
      setPassword("");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (token) load(1);
  }, [token]);
  const load = async (p = page) => {
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      const q = new URLSearchParams({ page: String(p), pageSize: "20" });
      if (search.trim()) q.set("search", search.trim());
      if (status) q.set("status", status);
      const r = await fetch(`${apiBase}/api/enquiries?${q}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok)
        throw new Error(d.detail || d.title || "Could not load enquiries.");
      setItems(d.items || []);
      setPage(d.page || p);
      setTotalPages(d.totalPages || 1);
    } catch (e) {
      if (e.message.includes("401")) setToken("");
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  const detail = async (id) => {
    try {
      const r = await fetch(`${apiBase}/api/enquiries/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d.detail || "Could not load enquiry.");
      setSelected(d);
    } catch (e) {
      setError(e.message);
    }
  };
  const updateStatus = async (s) => {
    if (!selected) return;
    setLoading(true);
    try {
      const r = await fetch(`${apiBase}/api/enquiries/${selected.id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: s }),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d.detail || "Could not update status.");
      setSelected(d);
      load(page);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  if (!token)
    return (
      <div className="admin-page">
        <div className="admin-card">
          <a className="admin-back" href="/">
            ← Back to website
          </a>
          <h1>Verde Aura Farms</h1>
          <p className="admin-subtitle">Admin Login</p>
          <form onSubmit={login}>
            <label>
              Username
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </label>
            {error && (
              <div className="error" role="alert">
                {error}
              </div>
            )}
            <button className="primary-btn" disabled={loading}>
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
          <small>
            Local development admin. Configure production credentials outside
            source control.
          </small>
        </div>
      </div>
    );
  return (
    <div className="admin-page">
      <div className="admin-shell">
        <header className="admin-header">
          <div>
            <strong>Verde Aura Farms</strong>
            <span>Admin Dashboard</span>
          </div>
          <div>
            <button
              className="admin-icon"
              onClick={() => load(page)}
              title="Refresh"
            >
              <RefreshCw size={18} />
            </button>
            <button className="admin-logout" onClick={() => setToken("")}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        </header>
        {error && (
          <div className="error" role="alert">
            {error}
          </div>
        )}
        <div className="admin-toolbar">
          <div className="search-box">
            <Search size={17} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, mobile, village"
              onKeyDown={(e) => e.key === "Enter" && load(1)}
            />
          </div>
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setTimeout(() => load(1), 0);
            }}
          >
            <option value="">All statuses</option>
            <option>New</option>
            <option>Contacted</option>
            <option>Appointment Requested</option>
            <option>Appointment Confirmed</option>
            <option>Farm Visit Completed</option>
            <option>Closed</option>
            <option>Cancelled</option>
          </select>
          <button className="primary-btn" onClick={() => load(1)}>
            Search
          </button>
        </div>
        <div className="admin-table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Village</th>
                <th>Service</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {items.map((x) => (
                <tr key={x.id} onClick={() => detail(x.id)}>
                  <td>#{x.id}</td>
                  <td>{x.name}</td>
                  <td>{x.mobileNumber}</td>
                  <td>{x.village || "—"}</td>
                  <td>{x.service || "—"}</td>
                  <td>
                    <span className="status-pill">{x.status}</span>
                  </td>
                  <td>{new Date(x.createdDateUtc).toLocaleString()}</td>
                </tr>
              ))}
              {!items.length && !loading && (
                <tr>
                  <td colSpan="7">No enquiries found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <button disabled={page <= 1} onClick={() => load(page - 1)}>
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button disabled={page >= totalPages} onClick={() => load(page + 1)}>
            Next
          </button>
        </div>
        {selected && (
          <div
            className="admin-modal"
            onMouseDown={(e) =>
              e.target === e.currentTarget && setSelected(null)
            }
          >
            <div className="admin-details">
              <button className="admin-close" onClick={() => setSelected(null)}>
                ×
              </button>
              <h2>Enquiry #{selected.id}</h2>
              <dl>
                {[
                  ["Name", selected.name],
                  ["Mobile", selected.mobileNumber],
                  ["Email", selected.email || "—"],
                  ["Village", selected.village || "—"],
                  ["Land Area", selected.landArea || "—"],
                  ["Service", selected.service],
                  [
                    "Preferred Date",
                    selected.preferredDate
                      ? new Date(selected.preferredDate).toLocaleDateString()
                      : "—",
                  ],
                  ["Message", selected.message || "—"],
                  [
                    "Created",
                    new Date(selected.createdDateUtc).toLocaleString(),
                  ],
                ].map(([k, v]) => (
                  <React.Fragment key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </React.Fragment>
                ))}
              </dl>
              <label>
                Status
                <select
                  value={selected.status}
                  onChange={(e) => updateStatus(e.target.value)}
                >
                  <option>New</option>
                  <option>Contacted</option>
                  <option>Appointment Requested</option>
                  <option>Appointment Confirmed</option>
                  <option>Farm Visit Completed</option>
                  <option>Closed</option>
                  <option>Cancelled</option>
                </select>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
