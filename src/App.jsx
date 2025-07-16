import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { FichaFantasma } from "./components/FichaFantasma";
import { fantasmas } from "./data/fantasmas";
import { pruebas as pruebasIniciales } from "./data/pruebas";
import { Pruebas } from "./components/Pruebas";
import "../src/css/pruebas.css";

function App() {
  const [filtro, setFiltro] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [modoEdicionF, setModoEdicionF] = useState(false);
  const [modoEdicionP, setModoEdicionP] = useState(false);
  const [fantasma, setFantasma] = useState(fantasmas);
  const [pruebas, setPruebas] = useState(pruebasIniciales);
  const [abierto, setAbierto] = useState(false);

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

  const handleAdmin = () => {
    setAdmin(!admin);
  };

  const handleEditionF = () => {
    setModoEdicionF(!modoEdicionF);
  };
  const handleEditionP = () => {
    setModoEdicionP(!modoEdicionP);
  };

  const onDelete = (id) => {
    setFantasma((prev) => prev.filter((fantasma) => fantasma.id !== id));
  };

  const pruebaDlte = (id) => {
    setPruebas((prev) => prev.filter((prueba) => prueba.id !== id));
  };

  const handleOpen = () => {
    setAbierto(!abierto);
  };

  const actualizarPrueba = (id, pruebaEdit) => {
    setPruebas((prev) =>
      prev.map((p) => (p.id === id ? { ...p, nombre: pruebaEdit } : p))
    );
  };

  const onAdd = (nombrePrueba) => {
    const nuevaPrueba = {
      id: pruebas.length + 1,
      nombre: nombrePrueba,
      filtrado: false,
    };
    setPruebas([...pruebas, nuevaPrueba]);
  };

  return (
    <>
      <Header admin={admin} handleAdmin={handleAdmin} />
      <div className="menuPrueba">
        <Pruebas
          key={pruebas.id}
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
          />
        ))}
      </div>
    </>
  );
}

export default App;
