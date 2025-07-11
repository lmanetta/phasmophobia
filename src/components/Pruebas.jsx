export const Pruebas = ({prueba, filtro, onClick}) => {
  const activo = filtro.includes(prueba.nombre);
  const estiloFiltro = {
    backgroundColor: activo ? "rgb(73, 73, 73)" : "transparent",
  };


  return (
    <div>
        <p style={estiloFiltro} onClick={() => onClick(prueba.nombre)}>{prueba.nombre}</p>
    </div>
  )
}