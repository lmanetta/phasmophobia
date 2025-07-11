export const Pruebas = ({prueba, filtro, onClick}) => {
 const estiloFiltro = {backgroundColor: filtro === prueba.nombre && "rgb(73, 73, 73"}

  return (
    <div>
        <p style={estiloFiltro} onClick={() => onClick(prueba.nombre)}>{prueba.nombre}</p>
    </div>
  )
}