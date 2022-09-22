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
        Producto: {producto.producto}
        <br></br>
        Precio: {producto.precio}
      </Alert>
    );
  });

  return listaProductos;
}

export default Productos;
