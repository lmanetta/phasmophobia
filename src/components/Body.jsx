import { useEffect, useState } from "react";
import { getFantasmas } from "../backend/controllers/fantasmas";
import FantasmaCard from "./FantasmaCard";
import {
  getEvidencias,
  getEvidenciasByEvidenciaId,
} from "../backend/controllers/evidencias";

const Body = () => {
  const [fantasmas, setFantasmas] = useState();
  const [evidencias, setEvidencias] = useState([]);
  const [fantasmaFiltro, setFantasmaFiltro] = useState();
  const [evidenciaFiltro, setEvidenciaFiltro] = useState();

  useEffect(() => {
    getFantasmas().then((data) => {
      setFantasmas(data);
      setFantasmaFiltro(data);
    });

    getEvidencias().then((data) => setEvidencias(data));
  }, []);

  const handleFilter = (e) => {
    e.target.checked && 
    getEvidenciasByEvidenciaId(e.target.value).then((data) =>
      setEvidenciaFiltro(data)
    );
    fantasmaFiltro.map((item) =>
      evidenciaFiltro?.map((evi) => 
        
      console.log(fantasmaFiltro.find((item2) => item2.id != evi.fantasma_id))


      )
    );
  };

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
                />{" "}
                {evidencias.prueba}
              </div>
            ))}
          </div>
          <div>
            <h2>Fantasmas</h2>
            {evidencias ? (
              fantasmaFiltro?.map((fantasma) => (
                <FantasmaCard
                  key={fantasma.id}
                  fantasma={fantasma}
                  evidencias={evidencias}
                />
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
