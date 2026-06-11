import { useNavigate } from "react-router-dom";
import "../styles/Landing.css";

function LandingPage() {
  const navigate = useNavigate();

  return (
    
    <div
  className="landing"
  onClick={() => navigate("/passenger")}
>
  <button
  className="admin-btn"
  onClick={(e) => {
    e.stopPropagation();
    navigate("/login");
  }}
>
  Admin Login
</button>
      {/* Bus container */}
      <div className="bus-container">
  <img src="/src/assets/bus.png" alt="bus" />
</div>


      {/* Title + pulse */}
      <div className="brand">
        <h1>
          BUS<span>PULSE</span>
        </h1>

        {/* ECG pulse placeholder */}
        <div className="pulse">
          <svg width="120" height="30" viewBox="0 0 120 30">
            <polyline
  points="0,15 10,15 15,5 20,25 25,15 35,15 40,8 45,22 50,15 60,15"
  fill="none"
  stroke="#38bdf8"
  strokeWidth="2"
/>

          </svg>
        </div>
      </div>

      {/* Hint text */}
      <p className="hint">Tap anywhere to check live crowd status</p>
    </div>
  );
}

export default LandingPage;
