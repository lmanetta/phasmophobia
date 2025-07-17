import { useState } from "react";
import "../pruebas/pruebas.css";

export const Pruebas = ({
  pruebas,
  filtro,
  onClick,
  pruebaDlte,
  admin,
  onEdition,
  modoEdicion,
  onUpdate,
  onAdd
}) => {

  const [nuevaPrueba, setNuevaPrueba] = useState("")
  const [agregarPrueba, setAgregarPrueba] = useState(false)
  const [menuAbierto, setMenuAbierto] = useState(false)


  const modoAgregar = () => {
    setAgregarPrueba(!agregarPrueba)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (nuevaPrueba){
      onAdd(nuevaPrueba)
      alert("Se ha agregado nueva prueba")
      setNuevaPrueba("")
    }
  }

  const handleOpen = () => {
    setMenuAbierto(!menuAbierto);
  };

  /* Style */
  // const activo = filtro.includes(pruebas.nombre);
  // const estiloFiltro = {
  //   backgroundColor: activo ? "rgb(73, 73, 73)" : "transparent",
  // };

  const activo = (nombre) => filtro.includes(nombre)

  return (
    <>
      <div className="pruebaContainer">
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
            <p style={{backgroundColor: activo(prueba.nombre) ? "rgb(73, 73, 73)" : "transparent"}} onClick={() => onClick(prueba.nombre)}>
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
      </div>
      {admin && (
        <>
          <button onClick={handleOpen} className="btnOpen" title="Opciones">
            <i
              class="fa-solid fa-plus"
              style={{
                transition: "transform 0.3s ease",
                transform: menuAbierto ? "rotate(45deg)" : "rotate(0deg)",
              }}
            ></i>
          </button>
          {agregarPrueba && (
              <div data-aos="fade-down" className="pruebaNueva">
                <form onSubmit={handleSubmit}>
                <label>Nueva prueba: 
                <input type="text"
              value={nuevaPrueba}
              onChange={(e) => setNuevaPrueba (e.target.value)}
              />
              </label>
              </form>
              <button
                  className="icono-delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    modoAgregar()
                  }}
                >
                  <i class="fa-solid fa-minus"></i>
                </button>
              </div>
            )}

          {menuAbierto && (
            <ul className="listaPlus">
              <li onClick={()=>{onEdition(); handleOpen()}}>Editar prueba</li>
              <li onClick={()=>{modoAgregar(); handleOpen()}}>Agregar prueba</li>
            </ul>
          )}
        </>
      )}
    </>
  );
};
