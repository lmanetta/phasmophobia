import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { FichaFantasma } from "./components/FichaFantasma";
import { fantasmas } from "./data/fantasmas";
import { pruebas as pruebasIniciales } from "./data/pruebas";
import { Pruebas } from "./components/Pruebas";
import "../src/css/pruebas.css";

function App() {
  const [fantasma, setFantasma] = useState(() => {
    const guardado = localStorage.getItem("fantasmas");
    return guardado ? JSON.parse(guardado) : fantasmas;
  });
  const [pruebas, setPruebas] = useState(
    () => {
      const guardado = localStorage.getItem("pruebasIniciales")
      return guardado ? JSON.parse(guardado) : pruebasIniciales
    }
  );
  const [admin, setAdmin] = useState(false);
  const [filtro, setFiltro] = useState([]);
  const [modoEdicionF, setModoEdicionF] = useState(false);
  const [modoEdicionP, setModoEdicionP] = useState(false);
  const [abierto, setAbierto] = useState(false);

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
    setAdmin(!admin);
  };

  //Activar/desactivar edicion en pruebas y fantasmas
  const handleEditionF = () => {
    setModoEdicionF(!modoEdicionF);
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
    localStorage.setItem("pruebas", JSON.stringify(listaPruebas));
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
    const nuevas = ([...pruebas, nuevaPrueba]);
    setPruebas(nuevas)
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
          abierto={abierto}
          handleOpen={handleOpen}
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
            onEdition={handleEditionF}
            modoEdicion={modoEdicionF}
            onDelete={onDelete}
            onUpdate={actualizarFantasmas}
          />
        ))}
      </div>
    </>
  );
}

export default App;
