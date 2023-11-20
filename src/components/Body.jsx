import { useEffect, useState } from "react";
import { getFantasmas } from "../backend/controllers/fantasmas";
import FantasmaCard from "./FantasmaCard";
import {
  getEvidencias,
  getEvidenciasByEvidenciaId,
  getPruebaFantasma,
} from "../backend/controllers/evidencias";

import { getFantasmasById } from "../backend/controllers/fantasmas";

const Body = () => {
  const [fantasmas, setFantasmas] = useState();
  const [evidencias, setEvidencias] = useState();
  const [pruebas, setPruebas] = useState([]);
  const [pruebasFiltro, setPruebasFiltro] = useState([])
  const [fantasmaFiltro, setFantasmaFiltro] = useState([]);
  const [evidenciaFiltro, setEvidenciaFiltro] = useState([{}]);

  const [filtroOk, setFiltroOK] = useState(false);


  useEffect(() => {
    getFantasmas().then((data) => {
      setFantasmas(data);
      setFantasmaFiltro(data);
    });

    getEvidencias().then((data) => setEvidencias(data));

    getPruebaFantasma().then((data)=> {
      setPruebas(data);
      setPruebasFiltro(data);
  })
  }, []);

  const handleFilter = (e) => {
    e.target.checked ? handleFilterClicked(e.target.value) : handleFilterUnClicked(e.target.value)
   
  };

  const handleFilterClicked =(e)=>{

    setEvidenciaFiltro([{}])

    let pruebasFiltradas = pruebasFiltro.filter((item)=>item.evidencia_id == e)
    
    let fantasmasFiltrados = []
    
    pruebasFiltradas.map((item)=>
    getFantasmasById(item.fantasma_id).then((data)=>fantasmasFiltrados=(data[0])).then(()=>evidenciaFiltro.push({
      id: fantasmasFiltrados.id,
      nombre: fantasmasFiltrados.nombre,
    })).finally(()=>setFantasmaFiltro(evidenciaFiltro.slice(1))))

    
 
   
    
  }

  const handleFilterUnClicked =(e)=>{
    setFantasmaFiltro(fantasmas)
  }

  return (
    <div>
      {fantasmas && (
        <>
          {/* <input value={inputSort} onChange={(e) => handleFilter(e)} /> */}
          <h2>Evidencias</h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              margin: "2px",
              padding: "2px",
              border: "1px solid black",
            }}
          >
            {evidencias?.map((evidencias) => (
              <div
                style={{ margin: "5px", display: "flex", alignItems: "center" }}
              >
                <input
                  type="checkbox"
                  value={evidencias.id}
                  onClick={(e) => handleFilter(e)}
                />
                {evidencias.prueba}
              </div>
            ))}
          </div>
          <div>
            <h2>Fantasmas</h2>
            {evidencias && fantasmaFiltro ? (
              fantasmaFiltro.map((fantasma) => (
                // console.log(fantasma)
                <>
                <FantasmaCard
                  key={fantasma.id}
                  fantasma={fantasma}
                  evidencias={evidencias}
                />
                </>
              ))
            ) : (
              <span>Loading...</span>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Body;
