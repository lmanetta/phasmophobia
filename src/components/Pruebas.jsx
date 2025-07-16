import { useState } from "react";
import "../css/pruebas.css";

export const Pruebas = ({
  pruebas,
  filtro,
  onClick,
  pruebaDlte,
  admin,
  abierto,
  handleOpen,
  onEdition,
  modoEdicion,
  onUpdate,
  onAdd
}) => {

  const [nuevaPrueba, setNuevaPrueba] = useState("")
  const [agregarPrueba, setAgregarPrueba] = useState(false)


  const modoAgregar = () => {
    setAgregarPrueba(!agregarPrueba)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (nuevaPrueba){
      onAdd(nuevaPrueba)
      setNuevaPrueba("")
    }
  }

  /* Style */
  const activo = filtro.includes(pruebas.nombre);
  const estiloFiltro = {
    backgroundColor: activo ? "rgb(73, 73, 73)" : "transparent",
  };

  return (
    <>
      {pruebas.map((prueba) => (
        <div key={prueba.id}>
          {modoEdicion ? (
            <input className="inputPrueba"
              type="text"
              value={prueba.nombre}
              onChange={(e) => onUpdate(prueba.id, e.target.value)}
              onClick={(e) => {
                e.stopPropagation();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {onEdition()}
              }}
            />
          ) : (
            <>
            <p style={estiloFiltro} onClick={() => onClick(prueba.nombre)}>
              {prueba.nombre}
              {admin && (
                <button
                  className="icono-delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    pruebaDlte(prueba.id);
                  }}
                >
                  <i class="fa-solid fa-xmark"></i>
                </button>
              )}
            </p>
            
            </>
          )}
        </div>
      ))}
      {admin && (
        <>
          <button onClick={handleOpen} className="btnOpen" title="Opciones">
            <i
              class="fa-solid fa-plus"
              style={{
                transition: "transform 0.3s ease",
                transform: abierto ? "rotate(45deg)" : "rotate(0deg)",
              }}
            ></i>
          </button>
          {agregarPrueba && (
              <form onSubmit={handleSubmit}>
                <label>Nueva prueba: 
                <input type="text"
              value={nuevaPrueba}
              onChange={(e) => setNuevaPrueba (e.target.value)}
              /* onKeyDown={(e) => {
                if (e.key === "Enter") {modoAgregar()}
              }} *//>
              </label>
              </form>
            )}

          {abierto && (
            <ul className="listaPlus">
              <li onClick={()=>onEdition()}>Editar</li>
              <li onClick={()=>modoAgregar()}>Agregar pista</li>
            </ul>
          )}
        </>
      )}
    </>
  );
};
