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

  const fantasmasFilter = filtro.length
    ? fantasmas.filter((fantasma) =>
        filtro.every((f) => fantasma.pruebas.includes(f))
      )
    : fantasmas;

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
        {fantasmasFilter.map((fantasma, index) => (
          <FichaFantasma
            key={index + fantasma}
            fantasma={fantasma}
            admin={admin}
            onEdition={handleEdition}
            modoEdicion={modoEdicion}
          />
        ))}
      </div>
    </>
  );
}

export default App;
