import { useEffect, useState } from "react";
import { getEvidenciasByFantasmaId } from "../backend/controllers/evidencias";

const FantasmaCard = ({ fantasma, evidencias }) => {
  const [prueba, setPrueba] = useState([]);

  useEffect(() => {
    getEvidenciasByFantasmaId(fantasma.id).then((data) => setPrueba(data));
  }, []);
  return (
    <>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          margin: "10px",
          display: "inline-block",
        }}
        >
        <h3>{fantasma.nombre}</h3>
        {prueba?.map((item)=> (
        <span>{evidencias[item.evidencia_id-1].prueba}</span>
        ))}
        <p>Descripcion</p>
      </div>
    </>
  );
};

export default FantasmaCard;
