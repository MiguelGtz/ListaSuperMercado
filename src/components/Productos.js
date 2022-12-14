import React from "react";
import { Alert } from "react-bootstrap";

function Productos(props) {
  const listaProductos = props.productos.map((producto, index) => {
    return (
      <Alert
        key={index}
        dismissible
        onClose={() => props.eliminar(producto.precio, index)}
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
