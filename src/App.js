import "./App.css";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import Producto from "./components/Productos";

function App() {
  const [producto, setProducto] = useState("");
  const [precio, setPrecio] = useState(0);
  const [productos, setProductos] = useState([]);
  const [costoTotal, setCostoTotal] = useState(0.0);

  const agregar = (e) => {
    e.preventDefault();
    setProductos([...productos, { producto: producto, precio: precio }]);
    setCostoTotal(costoTotal + precio);
  };

  const eliminar = (product) => {
    setProductos(
      productos.filter((producto) => producto.producto !== product.producto)
    );
    setCostoTotal(costoTotal - product.precio);
  };

  return (
    <div className="App">
      <h1 className="centrar">Lista de Compras</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Producto</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setProducto(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            onChange={(e) => setPrecio(parseFloat(e.target.value))}
          />
        </Form.Group>
        <div className="centrar">
          <Button
            className="mb-3"
            variant="success"
            type="submit"
            onClick={(e) => agregar(e)}
          >
            Agregar
          </Button>
        </div>
      </Form>
      <h5>Costo Total: {costoTotal}</h5>
      <Producto productos={productos} eliminar={eliminar}></Producto>
    </div>
  );
}

export default App;
