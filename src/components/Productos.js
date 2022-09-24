import React from "react";
import { Alert } from "react-bootstrap";

function Productos(props) {
  const listaProductos = props.productos.map((producto) => {
    return (
      <Alert
        key={producto.producto}
        dismissible
        onClose={() => props.eliminar(producto)}
      >
        <strong>Producto:</strong> {producto.producto}
        <br></br>
        <strong>Precio:</strong> {producto.precio}
      </Alert>
    );
  });

  return listaProductos;
}

export default Productos;
