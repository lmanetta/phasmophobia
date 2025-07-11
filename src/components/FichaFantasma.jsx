import { useState } from "react";
import "../css/fichaFantasma.css";

export const FichaFantasma = ({ fantasma }) => {
  const [vuelta, setVuelta] = useState(true);
  const [visible, setVisible] = useState(true);

  /* Volteo */
  const volteo = visible ? "contenidoVoltear" : "contenidoVoltear hidden";

  const handleVuelta = () => {
    setVisible(false);

    setTimeout(() => {
      setVuelta(!vuelta);
      setVisible(true);
    }, 300);
  };

  return (
    <div className="container" onClick={handleVuelta}>
      <h3>{fantasma.name}</h3>
      <button
        className="botonContainer"
        type="button"
        onClick={(e) => e.stopPropagation()}
        title="Editar"
      >
        <i class="fa-solid fa-pen"></i>
      </button>
      <div className={volteo}>
        {vuelta ? (
          /* FRENTE */
          <div className="frenteData">
            <div className="pruebasContainer">
              {fantasma.pruebas.map((prueba, index) => (
                <p key={index + prueba}>{prueba}</p>
              ))}
            </div>
            <p>Cordura: {fantasma.cordura}</p>
          </div>
        ) : (
          /* DETRÁS */
          <div className="atrasData">
            <ul>
              {fantasma.estrategias.map((estrategia) => (
                <li>{estrategia}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
