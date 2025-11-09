import React, { useState, useEffect } from "react";

function App() {
  const [form, setForm] = useState({ Name: "", Phone: "", Address: "" });
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);

  
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }


  async function saveData() {
    await fetch("http://localhost:3000/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    alert("✅ Data inserted successfully!");
    showData();
    setForm({ Name: "", Phone: "", Address: "" });
  }

  // Fetch API
  async function showData() {
    const res = await fetch("http://localhost:3000/fetch");
    const result = await res.json();
    setUsers(result.data);
  }

  // Delete API
  async function deleteData(id) {
    await fetch(`http://localhost:3000/del/${id}`, {
      method: "DELETE",
    });
    alert("🗑️ Data deleted successfully!");
    showData();
  }

  // Delete All API
  async function deleteAllData() {
    await fetch("http://localhost:3000/deleteAll", {
      method: "DELETE",
    });
    alert("🗑️ All data deleted successfully!");
    showData(); // refresh table
  }

  // Edit button click
  function editData(user) {
    setEditId(user.ID);
    setForm({ Name: user.Name, Phone: user.Phone, Address: user.Address });
  }

  // Update API
  async function updateData() {
    await fetch(`http://localhost:3000/update/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    alert("✏️ Data updated successfully!");
    setEditId(null);
    setForm({ Name: "", Phone: "", Address: "" });
    showData();
  }

  useEffect(() => {
    showData();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}> Amazon Users</h2>

        {/* Input Fields */}
        <div style={styles.form}>
          <input
            name="Name"
            value={form.Name}
            onChange={handleChange}
            placeholder="Enter Name"
            style={styles.input}
          />
          <input
            name="Phone"
            value={form.Phone}
            onChange={handleChange}
            placeholder="Enter Phone"
            style={styles.input}
          />
          <input
            name="Address"
            value={form.Address}
            onChange={handleChange}
            placeholder="Enter Address"
            style={styles.input}
          />
        </div>

        {/* Buttons */}
        <div style={styles.btnContainer}>
          {editId ? (
            <button onClick={updateData} style={styles.updateBtn}>
              🔄 Update
            </button>
          ) : (
            <button onClick={saveData} style={styles.saveBtn}>
              Save
            </button>
          )}
          <button onClick={showData} style={styles.showBtn}>
           Show
          </button>
          <button onClick={deleteAllData} style={styles.deleteAllBtn}>
            🗑️ Delete All
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ marginTop: 40, overflowX: "auto" }}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeadRow}>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.ID} style={styles.tableRow}>
                <td>{u.ID}</td>
                <td>{u.Name}</td>
                <td>{u.Phone}</td>
                <td>{u.Address}</td>
                <td>
                  <button onClick={() => editData(u)} style={styles.editBtn}>
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => deleteData(u.ID)}
                    style={styles.deleteBtn}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


const styles = {
  container: {
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
    background: "linear-gradient(135deg, #f6f8fa, #e8ecf3)",
    minHeight: "100vh",
    padding: "40px",
    color: "#1f2937",
  },
  card: {
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(8px)",
    maxWidth: "600px",
    margin: "0 auto",
    padding: "30px 35px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(255,255,255,0.6)",
  },
  heading: {
    textAlign: "center",
    fontWeight: "600",
    letterSpacing: "0.5px",
    color: "#111827",
    fontSize: "22px",
    marginBottom: "20px",
  },
  form: {
    display: "grid",
    gap: "12px",
  },
  input: {
    padding: "12px 14px",
    fontSize: "15px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    backgroundColor: "#f9fafb",
    outline: "none",
    transition: "0.3s ease",
  },
  btnContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "20px",
  },
  saveBtn: {
    backgroundColor: "#007aff",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "500",
    transition: "0.3s",
  },
  updateBtn: {
    backgroundColor: "#f59e0b",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "500",
    transition: "0.3s",
  },
  showBtn: {
    backgroundColor: "#10b981",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "500",
    transition: "0.3s",
  },
  deleteAllBtn: {
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "500",
    transition: "0.3s",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    overflow: "hidden",
  },
  tableHeadRow: {
    backgroundColor: "#007aff",
    color: "white",
    textAlign: "left",
    fontWeight: "500",
  },
  tableRow: {
    borderBottom: "1px solid #e5e7eb",
    transition: "0.2s",
  },
  editBtn: {
    backgroundColor: "#f59e0b",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    marginRight: "5px",
    transition: "0.3s",
  },
  deleteBtn: {
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default App;
