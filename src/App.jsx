import { useState } from "react";

function App() {
  // Add input
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");

  // Edit states
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  // ---------- VALIDATION FUNCTION ----------
  function validate(value, index = null) {
    const trimmed = value.trim();

    if (trimmed.length < 3) return "Minimum 3 characters required";
    if (/\d/.test(trimmed)) return "Numbers are not allowed";
    if (trimmed !== value) return "No leading or trailing spaces allowed";
    if (
      items.some(
        (item, i) =>
          item.toLowerCase() === trimmed.toLowerCase() && i !== index
      )
    )
      return "Item already exists";

    return "";
  }

  // ---------- ADD INPUT CHANGE ----------
  function handleChange(e) {
    const value = e.target.value;
    setInput(value);
    setMessage(validate(value));
  }

  // ---------- ADD ITEM ----------
  function handleAdd() {
    const error = validate(input);
    if (error) {
      setMessage(error);
      return;
    }

    setItems([...items, input.trim()]);
    setInput("");
    setMessage("");
  }

  // ---------- EDIT ----------
  function handleEdit(index) {
    setEditIndex(index);
    setEditValue(items[index]);
    setMessage("");
  }

  // ---------- SAVE ----------
  function handleSave(index) {
    const error = validate(editValue, index);
    if (error) {
      setMessage(error);
      return;
    }

    const updated = [...items];
    updated[index] = editValue.trim();
    setItems(updated);

    setEditIndex(null);
    setEditValue("");
    setMessage("");
  }

  // ---------- CANCEL ----------
  function handleCancel() {
    setEditIndex(null);
    setEditValue("");
    setMessage("");
  }

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2>React Validation App</h2>

      {/* Add Input */}
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Enter items here"
      />
      <button onClick={handleAdd}>Add</button>

      {/* Message */}
      {message && <p>{message}</p>}

      {/* Total */}
      <p>Total items: {items.length}</p>

      {/* List */}
      {items.length === 0 ? (
        <p>No items added yet</p>
      ) : (
        <ul>
          {items.map((item, index) => (
            <li key={index} style={{ marginBottom: "8px" }}>
              {editIndex === index ? (
                <>
                  <input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <button onClick={() => handleSave(index)}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </>
              ) : (
                <>
                  <span>{item}</span>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
