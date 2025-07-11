import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { FichaFantasma } from "./components/FichaFantasma";
import { fantasmas } from "./data/fantasmas";
import { pruebas } from "./data/pruebas";
import { Pruebas } from "./components/Pruebas";

function App() {
  const [filtro, setFiltro] = useState();

  const fantasmasFilter = filtro
    ? fantasmas.filter((fantasma) => fantasma.pruebas.includes(filtro))
    : fantasmas;

  const onClick = (prueba) => {
    setFiltro((prevFiltro) => (prevFiltro === prueba ? null : prueba));
  };

  return (
    <>
      <Header />
      <div className="menuPrueba">
        {pruebas.map((prueba, id) => (
          <Pruebas
            key={id}
            prueba={prueba}
            filtro={filtro}
            onClick={onClick}
          />
        ))}
      </div>

      <div className="fichaContainer">
        {fantasmasFilter.map((fantasma, index) => (
          <FichaFantasma key={index + fantasma} fantasma={fantasma} />
        ))}
      </div>
    </>
  );
}

export default App;
