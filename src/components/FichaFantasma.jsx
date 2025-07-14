import { useState } from "react";
import "../css/fichaFantasma.css";

export const FichaFantasma = ({
  fantasma,
  admin,
  onEdition,
  modoEdicion,
  onDelete,
}) => {
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

  const handleSubmit = (e) => {
    e.stopPropagation();
    onEdition();
  };

  return (
    <div className="container" onClick={handleVuelta}>
      <div className="info">
        <form onSubmit={handleSubmit}>
          {modoEdicion ? (
            <label>
              Nombre:
              <input
                type="text"
                value={infoFantasma.name}
                onChange={(e) => handleChange("name", e.target.value)}
                onClick={(e) => {e.stopPropagation()}}
              />
            </label>
          ) : (
            <h3>{infoFantasma.name}</h3>
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
              <button
                className="botonDelete"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(fantasma.id);
                }}
                title="Eliminar"
              >
                <i class="fa-solid fa-trash"></i>
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
                      {infoFantasma.pruebas.map((prueba, id) => (
                        <input
                          className="inputPruebas"
                          key={id}
                          type="text"
                          value={prueba}
                          onChange={(e) => editPruebas(id, e)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      ))}
                    </label>
                  ) : (
                    <div className="cadaPrueba">
                      {infoFantasma.pruebas.map((prueba, id) => (
                        <p key={id} style={pruebaObl(prueba)}>
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
                  <p>Cordura: {infoFantasma.cordura}</p>
                )}
              </div>
            ) : (
              /* DETRÁS */
              <div className="atrasData">
                {modoEdicion ? (
                  <>
                    <label>
                      Estrategias:
                      {infoFantasma.estrategias.map((estrategia, id) => (
                        <input
                          key={id}
                          type="text"
                          value={estrategia}
                          onChange={(e) => editEstrategias(id, e)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      ))}
                    </label>
                  </>
                ) : (
                  <ul>
                    {infoFantasma.estrategias.map((estrategia, id) => (
                      <li key={id + estrategia}>{estrategia}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
          {modoEdicion && (
            <div className="botonesFinalizar">
              <button
                type="submit"
                onClick={(e) => {
                  onEdition();
                  e.stopPropagation();
                }}
                title="Actualizar"
              >
                <i class="fa-solid fa-check"></i>
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
