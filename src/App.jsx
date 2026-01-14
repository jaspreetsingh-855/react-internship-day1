import { useState } from "react";

function App() {
  // Store input value
  const [input, setInput] = useState("");

  // Store list items
  const [items, setItems] = useState([]);

  // Store validation message
  const [message, setMessage] = useState("");

  // ---------- VALIDATION LOGIC ----------
  const trimmedInput = input.trim();

  const isTooShort = trimmedInput.length < 3;
  const hasNumber = /\d/.test(trimmedInput);
  const isDuplicate = items.some(
    (item) => item.toLowerCase() === trimmedInput.toLowerCase()
  );

  const isInvalid =
    isTooShort || hasNumber || trimmedInput !== input || isDuplicate;

  // ---------- HANDLE INPUT ----------
  function handleChange(e) {
    const value = e.target.value;
    setInput(value);

    if (value.trim().length < 3) {
      setMessage("Minimum 3 characters required");
    } else if (/\d/.test(value)) {
      setMessage("Numbers are not allowed");
    } else if (value !== value.trim()) {
      setMessage("No leading or trailing spaces allowed");
    } else if (
      items.some(
        (item) => item.toLowerCase() === value.trim().toLowerCase()
      )
    ) {
      setMessage("Item already exists");
    } else {
      setMessage("Looks good ✅");
    }
  }

  // ---------- ADD ITEM ----------
  function handleAdd() {
    if (isInvalid) return;

    setItems([...items, trimmedInput]);
    setInput("");
    setMessage("");
  }

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2>React Validation App</h2>

      {/* Input */}
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Enter item"
      />

      {/* Add Button */}
      <button onClick={handleAdd} disabled={isInvalid}>
        Add
      </button>

      {/* Status Message */}
      {message && <p>{message}</p>}

      {/* Total Count */}
      <p>Total items: {items.length}</p>

      {/* Empty State */}
      {items.length === 0 ? (
        <p>No items added yet</p>
      ) : (
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
