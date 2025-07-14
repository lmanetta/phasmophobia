import { useState } from "react";
import "../css/fichaFantasma.css";

export const FichaFantasma = ({ fantasma, admin, onEdition, modoEdicion }) => {
  const [vuelta, setVuelta] = useState(true);
  const [visible, setVisible] = useState(true);
  const [infoFantasma, setInfoFantasma] = useState({ ...fantasma });

  /* Volteo */
  const volteo = visible ? "contenidoVoltear" : "contenidoVoltear hidden";

  const handleVuelta = () => {
    setVisible(false);

    setTimeout(() => {
      setVuelta(!vuelta);
      setVisible(true);
    }, 300);
  };

  const pruebaObl = (prueba) => {
    return {
      fontWeight: prueba === fantasma.pruebaObligatoria ? "bold" : "normal",
      border: prueba === fantasma.pruebaObligatoria ? "2px solid" : "normal",
    };
  };

  const handleChange = (propiedad, valor) => {
    setInfoFantasma((prev) => ({
      ...prev,
      [propiedad]: valor,
    }));
  };

  const editPruebas = (i, e) => {
    const nuevasPruebas = [...infoFantasma.pruebas];
    nuevasPruebas[i] = e.target.value;
    handleChange("pruebas", nuevasPruebas);
  };

  const editEstrategias = (i, e) => {
    const nuevasEstrategias = [...infoFantasma.estrategias];
    nuevasEstrategias[i] = e.target.value;
    handleChange("estrategias", nuevasEstrategias);
  };

  return (
    <div className="container" onClick={handleVuelta}>
      <div className="info">
        {modoEdicion ? (
        <label>
          Nombre:
          <input
            type="text"
            value={infoFantasma.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </label>
      ) : (
        <h3>{fantasma.name}</h3>
      )}
      {admin && (
        <>
          <button
            className="botonEditar"
            type="button"
            onClick={(e) => {
              onEdition();
              e.stopPropagation();
            }}
            title="Editar"
          >
            <i class="fa-solid fa-pen"></i>
          </button>
        </>
      )}
      <div className={volteo}>
        {vuelta ? (
          /* FRENTE */
          <div className="frenteData">
            <div className="pruebasContainer">
              {modoEdicion ? (
                <label className="labelPruebas">
                  Pruebas:
                  {infoFantasma.pruebas.map((prueba, index) => (
                    <input
                      className="inputPruebas"
                      key={index + prueba}
                      type="text"
                      value={prueba}
                      onChange={editPruebas}
                      onClick={(e) => e.stopPropagation()}
                    />
                  ))}
                </label>
              ) : (
                <div className="cadaPrueba">
                  {infoFantasma.pruebas.map((prueba, index) => (
                    <p key={index + prueba} style={pruebaObl(prueba)}>
                      {prueba}
                    </p>
                  ))}
                </div>
              )}
            </div>
            {modoEdicion ? (
              <label className="labelCordura">
                Cordura:
                <input
                  type="text"
                  value={infoFantasma.cordura}
                  onChange={(e) => handleChange("cordura", e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </label>
            ) : (
              <p>Cordura: {fantasma.cordura}</p>
            )}
          </div>
        ) : (
          /* DETRÁS */
          <div className="atrasData">
            {modoEdicion ? (
              <>
                <label>
                  Estrategias:
                  {infoFantasma.estrategias.map((estrategia, index) => (
                    <input
                      key={index + estrategia}
                      type="text"
                      value={estrategia}
                      onChange={editEstrategias}
                      onClick={(e) => e.stopPropagation()}
                    />
                  ))}
                </label>
              </>
            ) : (
              <ul>
                {infoFantasma.estrategias.map((estrategia, index) => (
                  <li key={index + estrategia}>{estrategia}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
      {modoEdicion && (
        <div className="botonesFinalizar">
          <button
            // className="botonContainer"
            type="button"
            onClick={(e) => {
              onEdition();
              e.stopPropagation();
            }}
            title="Actualizar"
          >
            <i class="fa-solid fa-check"></i>
          </button>
          <button
            // className="botonContainer"
            type="button"
            onClick={(e) => {
              onEdition();
              e.stopPropagation();
            }}
            title="Actualizar"
          >
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      )}
      </div>
    </div>
  );
};
