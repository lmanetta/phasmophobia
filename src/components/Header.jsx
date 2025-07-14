import "../css/header.css";

export const Header = ({admin, handleAdmin}) => {
  return (
    <>
      <h1>PHASMOPHOBIA</h1>
      {admin ? (
        <button title="Visitante" onClick={handleAdmin} className="headBtn">
          <i class="fa-solid fa-ghost"></i>
        </button>
      ) : (
        <button title="Admin" onClick={handleAdmin} className="headBtn">
          <i class="fa-solid fa-user"></i>
        </button>
      )}
    </>
  );
};
