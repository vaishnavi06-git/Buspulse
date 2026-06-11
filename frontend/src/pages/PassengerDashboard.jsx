import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
function PassengerDashboard() {
  const [routes, setRoutes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
  };
  
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await api.get("/routes");
        setRoutes(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRoutes();

    const interval = setInterval(fetchRoutes, 10000);

    return () => clearInterval(interval);
  }, []);

  const filteredRoutes = routes.filter((route) =>
    route.routeName.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const sortedRoutes = [...filteredRoutes].sort((a, b) => {
    const priority = {
      GREEN: 1,
      YELLOW: 2,
      RED: 3,
    };

    return priority[a.crowdStatus] - priority[b.crowdStatus];
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#020617",
        color: "#f8fafc",
        padding: "30px",
      }}
    >
      {" "}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "10px",
          alignItems: "center",
          marginBottom: "30px",
          paddingBottom: "15px",
          borderBottom: "1px solid #1e293b",
        }}
      >
        <h2
          style={{
            color: "#facc15",
            margin: 0,
          }}
        >
          🚌 BUSPULSE 
        </h2>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              backgroundColor: "#052e16",
              color: "#4ade80",
              border: "1px solid #22c55e",
              borderRadius: "999px",
              padding: "6px 14px",
              fontSize: "13px",
              fontWeight: "bold",
            }}
          >
            🟢 Live Crowd Data
          </div>

          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#ef4444",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </div>
      <h1
        style={{
          color: "#facc15",
          fontSize: "32px",
          marginBottom: "10px",
        }}
      >
        🚍 Hello Passenger , Check Bus Crowd Levels
      </h1>
      <p
        style={{
          color: "#94a3b8",
          marginBottom: "20px",
        }}
      >
        Check crowd levels before travelling
      </p>
      <input
        type="text"
        placeholder="🔍 Search Route..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "100%",
          maxWidth: "550px",
          boxSizing: "border-box",
          padding: "12px",
          marginBottom: "25px",
          borderRadius: "10px",
          border: "1px solid #334155",
          backgroundColor: "#0f172a",
          color: "#f8fafc",
          fontSize: "14px",
        }}
      />
      <div style={{ marginTop: "20px" }}>
        {sortedRoutes.length === 0 && (
          <p
            style={{
              color: "#94a3b8",
            }}
          >
            No routes found.
          </p>
        )}
        <h3
          style={{
            color: "#38bdf8",
            marginBottom: "10px",
          }}
        >
          📍 All Available Routes
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              window.innerWidth < 768 ? "1fr" : "2fr 1fr 1fr",
            padding: "12px",
            backgroundColor: "#0f172a",
            borderRadius: "10px",
            fontWeight: "bold",
            marginBottom: "10px",
            color: "#94a3b8",
            border: "1px solid #1e293b",
          }}
        >
          <div>Route</div>
          <div>Passengers</div>
          <div>Status</div>
        </div>
        {sortedRoutes.map((route) => (
          <div
            key={route._id}
            style={{
              display: "grid",
              gridTemplateColumns:
                window.innerWidth < 768 ? "1fr" : "2fr 1fr 1fr",
              alignItems: "center",
              padding: "14px",
              marginBottom: "8px",
              backgroundColor: "#0f172a",
              borderRadius: "8px",
              border: "1px solid #1e293b",
            }}
          >
            <div>
              <strong>{route.routeName}</strong>
            </div>

            <div>
              {route.currentCount}/{route.capacity}
            </div>


            <div
              style={{
                color:
                  route.crowdStatus === "RED"
                    ? "#ef4444"
                    : route.crowdStatus === "YELLOW"
                      ? "#facc15"
                      : "#22c55e",
                fontWeight: "bold",
              }}
            >
              {route.crowdStatus === "RED"
                ? "🔴 Crowded"
                : route.crowdStatus === "YELLOW"
                  ? "🟡 Moderate"
                  : "🟢 Comfortable"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PassengerDashboard;
