import { useState } from "react";
import "./App.css";
import { Header } from "./components/header/Header";
import { FichaFantasma } from "./components/fichaFantasma/FichaFantasma";
import { fantasmas } from "./data/fantasmas";
import { pruebas as pruebasIniciales } from "./data/pruebas";
import { Pruebas } from "./components/pruebas/Pruebas";
import "../src/components/pruebas/pruebas.css";
import { AddFantasma } from "./components/addFantasma/AddFantasma";

function App() {
  const [fantasma, setFantasma] = useState(() => {
    const guardado = localStorage.getItem("fantasmas");
    return guardado ? JSON.parse(guardado) : fantasmas;
  });
  const [pruebas, setPruebas] = useState(() => {
    const guardado = localStorage.getItem("pruebasIniciales");
    return guardado ? JSON.parse(guardado) : pruebasIniciales;
  });
  // const [admin, setAdmin] = useState(false);
  const [admin, setAdmin] = useState(() => {
    const guardado = localStorage.getItem("admin");
    return guardado ? JSON.parse(guardado) : false;
  });
  const [filtro, setFiltro] = useState([]);
  const [edicionFantasma, setEdicionFantasma] = useState();
  const [modoEdicionP, setModoEdicionP] = useState(false);
  const [abierto, setAbierto] = useState(false);
  const [newFantasma, setNewFantasma] = useState(false);

  //Filtro de fantasmas por prueba
  const fantasmasFilter = filtro.length
    ? fantasma.filter((f) => filtro.every((fant) => f.pruebas.includes(fant)))
    : fantasma;

  const onClick = (prueba) => {
    setFiltro((prevFiltros) =>
      prevFiltros.includes(prueba)
        ? prevFiltros.filter((filtro) => filtro !== prueba)
        : [...prevFiltros, prueba]
    );
  };

  //Admin
  const handleAdmin = () => {
    const estado = !admin;
    setAdmin(estado);
    localStorage.setItem("admin", JSON.stringify(estado));
  };

  //Activar/desactivar edicion en pruebas y fantasmas
  const toggleEdicionF = (id) => {
    setEdicionFantasma((prev) => (prev === id ? null : id));
  };
  const handleEditionP = () => {
    setModoEdicionP(!modoEdicionP);
  };

  //Eliminar
  const onDelete = (id) => {
    const listaFantasma = fantasma.filter((f) => f.id !== id);
    setFantasma(listaFantasma);
    localStorage.setItem("fantasmas", JSON.stringify(listaFantasma));
  };

  const pruebaDlte = (id) => {
    const listaPruebas = pruebas.filter((p) => p.id !== id);
    setPruebas(listaPruebas);
    localStorage.setItem("pruebasIniciales", JSON.stringify(listaPruebas));
  };

  //Acción del menú, para mostrar o no las opciones.
  const handleOpen = () => {
    setAbierto(!abierto);
  };

  //Editar y agregar pruebas
  const actualizarPrueba = (id, pruebaEdit) => {
    // );
    const pruebaAct = pruebas.map((p) =>
      p.id === id ? { ...p, nombre: pruebaEdit } : p
    );
    setPruebas(pruebaAct);
    localStorage.setItem("pruebasIniciales", JSON.stringify(pruebaAct));
  };

  const onAdd = (nombrePrueba) => {
    const nuevaPrueba = {
      id: pruebas.length + 1,
      nombre: nombrePrueba,
      filtrado: false,
    };
    const nuevas = [...pruebas, nuevaPrueba];
    setPruebas(nuevas);
    localStorage.setItem("pruebasIniciales", JSON.stringify(nuevas));
  };

  //Modificar fantasmas
  const actualizarFantasmas = (id, fantasmaEdit) => {
    const fantasmaAct = fantasma.map((f) =>
      f.id === id
        ? {
            ...f,
            ...fantasmaEdit,
          }
        : f
    );
    setFantasma(fantasmaAct);
    localStorage.setItem("fantasmas", JSON.stringify(fantasmaAct));
  };

  //Agregar fantasma
  const agregarFantasma = () => {
    setNewFantasma(!newFantasma);
  };

  const guardarFantasma = (nuevoFantasma) => {
  setFantasma(prev => [...prev, nuevoFantasma]);
  localStorage.setItem("fantasmas", JSON.stringify([...fantasma, nuevoFantasma]));
};

  return (
    <>
      <Header admin={admin} handleAdmin={handleAdmin} />
      <div className="menuPrueba">
        <Pruebas
          pruebas={pruebas}
          filtro={filtro}
          onClick={onClick}
          pruebaDlte={pruebaDlte}
          admin={admin}
          modoEdicion={modoEdicionP}
          onEdition={handleEditionP}
          onUpdate={actualizarPrueba}
          onAdd={onAdd}
        />
      </div>

      <div className="fichaContainer">
        {fantasmasFilter.map((fantasma) => (
          <FichaFantasma
            key={fantasma.id}
            fantasma={fantasma}
            admin={admin}
            onEdition={toggleEdicionF}
            modoEdicion={edicionFantasma}
            onDelete={onDelete}
            onUpdate={actualizarFantasmas}
          />
        ))}
      </div>
      {admin && (
        <div className="fantAdd">
          <button className="btnAgregarFant" onClick={handleOpen}>
            <i
              class="fa-solid fa-plus"
              style={{
                transition: "transform 0.3s ease",
                transform: abierto ? "rotate(45deg)" : "rotate(0deg)",
              }}
            ></i>
          </button>
          <AddFantasma newFantasma={newFantasma} setNewFantasma={setNewFantasma} fantasmas={fantasmas} setFantasma={setFantasma} onAdd={guardarFantasma} />
          {abierto && (
            <ul>
              <li
                onClick={() => {
                  agregarFantasma();
                  handleOpen();
                }}
              >
                Nuevo fantasma
              </li>
            </ul>
          )}
        </div>
      )}
    </>
  );
}

export default App;
