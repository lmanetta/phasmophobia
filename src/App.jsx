import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { FichaFantasma } from "./components/FichaFantasma";
import { fantasmas } from "./data/fantasmas";
import { pruebas } from "./data/pruebas";
import { Pruebas } from "./components/Pruebas";

function App() {
  const [filtro, setFiltro] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [fantasma, setFantasma] = useState(fantasmas)

  const fantasmasFilter = filtro.length
    ? fantasma.filter((f) =>
        filtro.every((fant) => f.pruebas.includes(fant))
      )
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

  const handleEdition = () => {
    setModoEdicion(!modoEdicion);
  };

  const onDelete = (id) =>{ 
    setFantasma((prev) => prev.filter((fantasma) => fantasma.id !== id))

  }

  return (
    <>
      <Header admin={admin} handleAdmin={handleAdmin} />
      <div className="menuPrueba">
        {pruebas.map((prueba) => (
          <Pruebas
            key={prueba.id}
            prueba={prueba}
            filtro={filtro}
            onClick={onClick}
          />
        ))}
      </div>

      <div className="fichaContainer">
        {fantasmasFilter.map((fantasma) => (
          <FichaFantasma
            key={fantasma.id}
            fantasma={fantasma}
            admin={admin}
            onEdition={handleEdition}
            modoEdicion={modoEdicion}
            onDelete={onDelete}
          />
        ))}
      </div>
    </>
  );
}

export default App;
