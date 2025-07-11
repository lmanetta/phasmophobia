import { useState } from "react";
import "../css/header.css";

export const Header = () => {
  const [admin, setAdmin] = useState(false);

  const handleClick = () => setAdmin(!admin);

  return (
    <>
      <h1>PHASMOPHOBIA</h1>
      {admin ? (
        <button title="Visitante" onClick={handleClick} className="headBtn">
          <i class="fa-solid fa-ghost"></i>
        </button>
      ) : (
        <button title="Admin" onClick={handleClick} className="headBtn">
          <i class="fa-solid fa-user"></i>
        </button>
      )}
    </>
  );
};
