import { useState } from "react";
import "../fichaFantasma/fichaFantasma.css";
// import { pruebas } from "../data/pruebas";

export const FichaFantasma = ({
  fantasma,
  admin,
  onEdition,
  modoEdicion,
  onDelete,
  onUpdate
}) => {

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

  const pruebaObl = (prueba) => {
    return {
      fontWeight: prueba === fantasma.pruebaObligatoria ? "bold" : "normal",
      border: prueba === fantasma.pruebaObligatoria ? "2px solid" : "normal",
    };
  };

  const handleChange = (prop, valor) => {
    const nuevo = {...fantasma, [prop]:valor}
    onUpdate(fantasma.id, nuevo)
  }

  const editPruebas = (i, e) => {
    const nuevasPruebas = [...fantasma.pruebas];
    nuevasPruebas[i] = e.target.value;
    onUpdate(fantasma.id, {...fantasma, pruebas:nuevasPruebas});
  };

  const editEstrategias = (i, e) => {
    const nuevasEstrategias = [...fantasma.estrategias];
    nuevasEstrategias[i] = e.target.value;
    onUpdate(fantasma.id, {...fantasma, estrategias:nuevasEstrategias});
  };

  const handleSubmit = (e) => {
    e.stopPropagation();
    onEdition(fantasma.id);
  };

  return (
    <div className="container" onClick={handleVuelta}>
      <div className="info">
        <form onSubmit={handleSubmit}>
          { admin && modoEdicion === fantasma.id ? (
            <label>
              Nombre:
              <input
                type="text"
                value={fantasma.name}
                onChange={(e) => handleChange("name", e.target.value)}
                onClick={(e) => {e.stopPropagation()}}
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
                  onEdition(fantasma.id);
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
                  {admin && modoEdicion === fantasma.id ? (
                    <label className="labelPruebas">
                      Pruebas:
                      {fantasma.pruebas.map((prueba, id) => (
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
                      {fantasma.pruebas.map((prueba, id) => (
                        <p key={id} style={pruebaObl(prueba)}>
                          {prueba}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
                {admin && modoEdicion === fantasma.id ? (
                  <label className="labelCordura">
                    Cordura:
                    <input
                      type="text"
                      value={fantasma.cordura}
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
                {admin && modoEdicion === fantasma.id ? (
                  <>
                    <label>
                      Estrategias:
                      {fantasma.estrategias.map((estrategia, id) => (
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
                    {fantasma.estrategias.map((estrategia, id) => (
                      <li key={id + estrategia}>{estrategia}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
          {admin && modoEdicion === fantasma.id && (
            <div className="botonesFinalizar">
              <button
                type="submit"
                onClick={(e) => {
                  onEdition(fantasma.id);
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
