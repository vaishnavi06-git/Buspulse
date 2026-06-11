import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        username,
        password,
      });

      const { role } = response.data;

      if (role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/passenger");
      }
    } catch (error) {
      alert("Invalid username or password");
      console.error(error);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        backgroundImage: `
      linear-gradient(
        rgba(2, 6, 23, 0.75),
        rgba(2, 6, 23, 0.85)
      ),
      url("/src/assets/bg.jpg")
    `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.32)", // opaque white
          padding: "35px",
          borderRadius: "14px",
          width: "320px",

          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          backdropFilter: "blur(4px)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
            color: "#020617",
            letterSpacing: "1px",
          }}
        >
          Login
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "6px",
            border: "1px solid #cbd5f5",
            outline: "none",
            fontSize: "0.95rem",
            boxSizing: "border-box", // 🔑 IMPORTANT
          }}
          onFocus={(e) => (e.target.style.border = "1px solid #38bdf8")}
          onBlur={(e) => (e.target.style.border = "1px solid #cbd5f5")}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "6px",
            border: "1px solid #cbd5f5",
            outline: "none",
            fontSize: "0.95rem",
            boxSizing: "border-box", // 🔑 IMPORTANT
          }}
          onFocus={(e) => (e.target.style.border = "1px solid #38bdf8")}
          onBlur={(e) => (e.target.style.border = "1px solid #cbd5f5")}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "5px",
            backgroundColor: "#facc15",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            color: "#020617",
            boxSizing: "border-box", // 🔑 IMPORTANT
            transition: "background-color 0.2s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#fde047")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#facc15")}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
