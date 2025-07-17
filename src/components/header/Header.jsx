import "../header/header.css";

export const Header = ({admin, handleAdmin}) => {
  return (
    <>
      <h1>PHASMOPHOBIA</h1>
      {admin ? (
        <>
        <button title="Salir a visitante" onClick={handleAdmin} className="headBtn">
          <i class="fa-solid fa-ghost"></i>
        </button>
        <button className="btnReinicio" onClick={() => localStorage.clear()}><i class="fa-solid fa-rotate-right"></i></button>
        </>
      ) : (
        <button title="Ingresar a Admin" onClick={handleAdmin} className="headBtn">
          <i class="fa-solid fa-user"></i>
        </button>
      )}
    </>
  );
};
