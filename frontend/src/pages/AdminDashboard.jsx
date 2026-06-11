import { useEffect, useState } from "react";
import api from "../services/api";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useNavigate } from "react-router-dom";
function AdminDashboard() {
  const [routes, setRoutes] = useState([]);
  const [lastUpdated, setLastUpdated] = useState("");
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
  };
  const fetchRoutes = async () => {
    try {
      const response = await api.get("/routes");
      setRoutes(response.data);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error(err);
      alert("Failed to load routes");
    }
  };
  useEffect(() => {
    fetchRoutes();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      fetchRoutes();
    }, 10000);

    return () => clearInterval(interval);
  }, []);
  const simulateCrowd = async () => {
    try {
      await api.post("/routes/simulate");

      await fetchRoutes();

      setLastUpdated(` ${new Date().toLocaleTimeString()}`);
    } catch (err) {
      console.error(err);
    }
  };
  const overcrowdedRoutes = routes.filter(
    (route) => route.crowdStatus === "RED",
  );
  const totalRoutes = routes.length;

  const greenRoutes = routes.filter(
    (route) => route.crowdStatus === "GREEN",
  ).length;

  const yellowRoutes = routes.filter(
    (route) => route.crowdStatus === "YELLOW",
  ).length;

  const redRoutes = routes.filter(
    (route) => route.crowdStatus === "RED",
  ).length;

  const chartData = [
    {
      name: "Green",
      value: greenRoutes,
    },
    {
      name: "Yellow",
      value: yellowRoutes,
    },
    {
      name: "Red",
      value: redRoutes,
    },
  ];
  const COLORS = ["#22c55e", "#facc15", "#ef4444"];
  const sortedRoutes = [...routes].sort((a, b) => {
    const priority = {
      RED: 1,
      YELLOW: 2,
      GREEN: 3,
    };

    return priority[a.crowdStatus] - priority[b.crowdStatus];
  });
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#020617",
        color: "#f8fafc",
        padding: "20px",
      }}
    >
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
            letterSpacing: "1px",
          }}
        >
          🚌 BUSPULSE • Transit Control Center
        </h2>

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
      <h1
        style={{
          color: "#facc15",
          fontSize: "26px",
          marginBottom: "5px",
          letterSpacing: "1px",
        }}
      >
        🚦 Operations Dashboard
      </h1>

      <p
        style={{
          color: "#94a3b8",
          marginBottom: "20px",
        }}
      >
        Last Updated: {lastUpdated}
      </p>
      <h3
        style={{
          color: "#ef4444",
          marginBottom: "15px",
        }}
      >
        ⚠️ Active Alerts
      </h3>

      <div
        style={{
          backgroundColor: "#0f172a",
          borderRadius: "10px",
          overflow: "hidden",
          border: "1px solid #1e293b",
          marginBottom: "20px",
        }}
      >
        {overcrowdedRoutes.length > 0 ? (
          <>
            {overcrowdedRoutes.map((route) => (
              <div
                key={route._id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
                  gap: "20px",
                  alignItems: "center",
                  padding: "12px",
                  borderTop: "1px solid #1e293b",
                }}
              >
                <div style={{ color: "#fefefe" }}>
                  ⚠️ {route.routeName} is overcrowded
                </div>

                <button
                  onClick={() =>
                    alert(`Additional bus allocated to ${route.routeName}`)
                  }
                  style={{
                    backgroundColor: "#dc2626",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    width: "fit-content",
                  }}
                >
                  Allocate Bus
                </button>
              </div>
            ))}
          </>
        ) : (
          <div
            style={{
              padding: "15px",
              color: "#22c55e",
            }}
          >
            ✅ No active alerts
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          gap: "15px",
          marginTop: "20px",
          marginBottom: "25px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={simulateCrowd}
          style={{
            padding: "12px 24px",
            backgroundColor: "#38bdf8",
            color: "#020617",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Simulate Crowd
        </button>

        <button
          onClick={() =>
            document
              .getElementById("statistics")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          style={{
            padding: "12px 24px",
            backgroundColor: "#facc15",
            color: "#020617",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          📊 View Statistics
        </button>
      </div>
      <h3
        style={{
          color: "#facc15",
          marginTop: "10px",
          marginBottom: "15px",
        }}
      >
        🚍 Route Monitor
      </h3>
      <div
        style={{
          overflowX: "auto",
        }}
      >
        <div style={{ marginTop: "20px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr",
              padding: "12px",
              backgroundColor: "#0f172a",
              borderRadius: "10px",
              fontWeight: "bold",
              marginBottom: "10px",
              color: "#94a3b8",
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
                gridTemplateColumns: "2fr 1fr 1fr",
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
      <div id="statistics">
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            marginTop: "30px",
          }}
        >
          <div
            style={{
              flex: 1,
              minWidth: "350px",
              backgroundColor: "#0f172a",
              border: "1px solid #1e293b",
              borderRadius: "12px",
              padding: "20px",
            }}
          >
            <h3
              style={{
                textAlign: "center",
                color: "#f8fafc",
              }}
            >
              Crowd Distribution
            </h3>

            <PieChart width={300} height={250}>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </div>
          <div
            style={{
              flex: 1,
              minWidth: "350px",
              backgroundColor: "#0f172a",
              border: "1px solid #1e293b",
              borderRadius: "12px",
              padding: "20px",
            }}
          >
            <h3
              style={{
                color: "#facc15",
                marginBottom: "20px",
              }}
            >
              📈 Live Insights
            </h3>

            <p>
              <strong>Total Routes:</strong> {totalRoutes}
            </p>

            <p style={{ color: "#22c55e" }}>🟢 Comfortable: {greenRoutes}</p>

            <p style={{ color: "#facc15" }}>🟡 Moderate: {yellowRoutes}</p>

            <p style={{ color: "#ef4444" }}>🔴 Overcrowded: {redRoutes}</p>

            <hr
              style={{
                margin: "20px 0",
                borderColor: "#1e293b",
              }}
            />

            <p>
              <strong>Last Updated:</strong>
              <br />
              {lastUpdated}
            </p>

            <hr
              style={{
                margin: "20px 0",
                borderColor: "#1e293b",
              }}
            />

            <p>
              <strong>Most Crowded Route</strong>
            </p>

            <p style={{ color: "#ef4444" }}>
              {
                [...routes].sort(
                  (a, b) =>
                    b.currentCount / b.capacity - a.currentCount / a.capacity,
                )[0]?.routeName
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
