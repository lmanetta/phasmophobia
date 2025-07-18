import { useState } from "react";
import "../addFantasma/addFantasma.css";

export const AddFantasma = ({
  newFantasma,
  setNewFantasma,
  onAdd,
  abrirNuevo,
}) => {
  const [nuevo, setNuevo] = useState({
    name: "",
    pruebas: ["", "", ""],
    pruebaObligatoria: "",
    estrategias: [""],
    cordura: "",
  });
  const [idCount, setIdCount] = useState(25);

  const handleChange = (prop, valor) => {
    setNuevo((prev) => ({ ...prev, [prop]: valor }));
  };

  const handlePruebas = (i, valor) => {
    const nuevaPrueba = [...nuevo.pruebas];
    nuevaPrueba[i] = valor;
    setNuevo((prev) => ({ ...prev, pruebas: nuevaPrueba }));
  };

  const handleEstrategias = (i, valor) => {
    const nuevaEstrategia = [...nuevo.estrategias];
    nuevaEstrategia[i] = valor;
    setNuevo((prev) => ({ ...prev, estrategias: nuevaEstrategia }));
  };

  const onClickEstr = () => {
    setNuevo((prev) => ({ ...prev, estrategias: [...prev.estrategias, ""] }));
  };

  const estDlte = (i) => {
    const confirmacion = window.confirm(
      "¿Estás segura/o de que querés borrar esta estrategia?"
    );
    if (!confirmacion) return;
    const nuevas = nuevo.estrategias.filter((_, e) => e !== i )
    setNuevo((prev) => ({... prev, estrategias:nuevas}))
  };

  const agregarFantasma = (e) => {
    e.preventDefault();
    const nuevoFantasma = {
      ...nuevo,
      id: idCount,
      name: nuevo.name,
      pruebas: nuevo.pruebas,
      pruebaObligatoria: nuevo.pruebaObligatoria || null,
      estrategias: nuevo.estrategias,
      cordura: nuevo.cordura,
    };

    setIdCount((idCount) => idCount + 1);
    onAdd(nuevoFantasma);
    setNewFantasma(false);

    setNuevo({
      name: "",
      pruebas: ["", "", ""],
      pruebaObligatoria: "",
      estrategias: [""],
      cordura: "",
    });
  };

  return (
    <div>
      {newFantasma && (
        <div data-aos="flip-up" className="formFantasma">
          <form onSubmit={agregarFantasma}>
            <h2>Nuevo fantasma</h2>
            <label>
              Nombre:
              <input
                type="text"
                value={nuevo.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </label>
            {[0, 1, 2].map((i) => (
              <label key={i + 1}>
                {" "}
                Prueba {i + 1}:
                <input
                  type="text"
                  value={nuevo.pruebas[i]}
                  onChange={(e) => handlePruebas(i, e.target.value)}
                  required
                />
              </label>
            ))}
            <label>
              Prueba obligatoria
              <input type="text" value={nuevo.pruebaObligatoria}
                onChange={(e) => handleChange("pruebaObligatoria", e.target.value)}/>
            </label>
            <label>Estrategia:</label>
            <div className="btnPlus">
              <button type="button" onClick={onClickEstr}>
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
            {nuevo.estrategias.map((estr, i) => (
              <div className="divEst">
                <textarea
                  key={i + 1}
                  type="text"
                  value={estr}
                  onChange={(e) => handleEstrategias(i, e.target.value)}
                />
                <button className="icono-borrar"  onClick={() =>estDlte(i)} >
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>
            ))}

            <label>
              Cordura:
              <input
                type="text"
                value={nuevo.cordura}
                onChange={(e) => handleChange("cordura", e.target.value)}
                required
              />
            </label>

            <div className="divBtn">
              <button className="btnGuardar" type="submit">
                Guardar fantasmas
              </button>
            </div>
            <button
              className="icono-cerrar"
              onClick={(e) => {
                e.stopPropagation();
                abrirNuevo();
              }}
            >
              <i class="fa-solid fa-minus"></i>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
