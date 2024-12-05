'use client';

import { useState, useEffect } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);

  const handleClick = (value) => {
    if (value === "." && input.includes(".")) return;
    setInput(input + value);
  };

  const handlePercentage = () => {
    try {
      setInput((parseFloat(input) / 100).toString());
    } catch {
      setInput("Error");
    }
  };

  const handleSquareRoot = () => {
    try {
      setInput(Math.sqrt(parseFloat(input)).toString());
    } catch {
      setInput("Error");
    }
  };

  const calculate = () => {
    try {
      const result = eval(input).toString();
      setInput(result);
      setHistory([`${input} = ${result}`, ...history.slice(0, 4)]);
    } catch {
      setInput("Error");
    }
  };

  const clearInput = () => {
    setInput("");
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((/[\d/*+\-().]/.test(e.key)) || e.key === "Enter") {
        handleClick(e.key === "Enter" ? "=" : e.key);
      } else if (e.key === "Backspace") {
        setInput(input.slice(0, -1));
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [input]);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Calculator</h1>
      <div style={styles.calculator}>
        <input
          type="text"
          value={input}
          readOnly
          style={styles.input}
        />
        <div style={styles.buttonGrid}>
          {["7", "8", "9", "/"].map((item) => (
            <button
              key={item}
              onClick={() => handleClick(item)}
              style={styles.button}
            >
              {item}
            </button>
          ))}
          {["4", "5", "6", "*"].map((item) => (
            <button
              key={item}
              onClick={() => handleClick(item)}
              style={styles.button}
            >
              {item}
            </button>
          ))}
          {["1", "2", "3", "-"].map((item) => (
            <button
              key={item}
              onClick={() => handleClick(item)}
              style={styles.button}
            >
              {item}
            </button>
          ))}
          {["0", ".", "=", "+"].map((item) => (
            <button
              key={item}
              onClick={item === "=" ? calculate : () => handleClick(item)}
              style={styles.button}
            >
              {item}
            </button>
          ))}
          <button
            onClick={handlePercentage}
            style={styles.specialButton}
          >
            %
          </button>
          <button
            onClick={handleSquareRoot}
            style={styles.specialButton}
          >
            √
          </button>
          <button
            onClick={clearInput}
            style={styles.clearButton}
          >
            Clear
          </button>
        </div>
      </div>
      <div style={styles.historyContainer}>
        <h3 style={styles.historyHeading}>History</h3>
        <ul style={styles.historyList}>
          {history.map((entry, index) => (
            <li key={index} style={styles.historyItem}>
              {entry}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "50px",
    fontFamily: "'Roboto', sans-serif",
    background: "linear-gradient(45deg, #3a7bd5, #00d2ff)",
    minHeight: "100vh",
    padding: "20px",
  },
  heading: {
    color: "#fff",
    fontSize: "36px",
    marginBottom: "20px",
    textShadow: "2px 2px 10px rgba(0,0,0,0.4)",
  },
  calculator: {
    background: "#fff",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    width: "360px",
  },
  input: {
    width: "100%",
    height: "50px",
    textAlign: "right",
    fontSize: "24px",
    marginBottom: "20px",
    paddingRight: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
    outline: "none",
  },
  buttonGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "15px",
  },
  button: {
    height: "60px",
    fontSize: "24px",
    backgroundColor: "#f0f0f0",
    border: "1px solid #ccc",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
  },
  specialButton: {
    height: "60px",
    fontSize: "24px",
    backgroundColor: "#f8b400",
    border: "1px solid #e68900",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  clearButton: {
    width: "100%",
    height: "60px",
    backgroundColor: "#e74c3c",
    color: "#fff",
    fontSize: "24px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  historyContainer: {
    width: "360px",
    marginTop: "30px",
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  },
  historyHeading: {
    fontSize: "22px",
    color: "#333",
    marginBottom: "15px",
    textAlign: "center",
  },
  historyList: {
    listStyleType: "none",
    paddingLeft: "0",
    marginTop: "0",
  },
  historyItem: {
    fontSize: "16px",
    color: "#555",
    borderBottom: "1px solid #ddd",
    padding: "5px 0",
  },
};
