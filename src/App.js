import "./App.css";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import Producto from "./components/Productos";
import Alerta from "./components/Alerta";

function App() {
  const [producto, setProducto] = useState("");
  const [precio, setPrecio] = useState("");
  const [productos, setProductos] = useState([]);
  const [costoTotal, setCostoTotal] = useState(0.0);
  const [estadoAlerta, setEstadoAlerta] = useState(false);

  const agregar = (e) => {
    e.preventDefault();
    if (producto && precio) {
      setProductos([...productos, { producto: producto, precio: precio }]);
      setCostoTotal(costoTotal + precio);
      setEstadoAlerta(false);
      setProducto("");
      setPrecio("");
    } else {
      setEstadoAlerta(true);
    }
  };

  const eliminar = (precio, indice) => {
    setProductos(productos.filter((_, index) => index !== indice));
    setCostoTotal(costoTotal - precio);
  };

  return (
    <div className="App">
      <h1 className="centrar">Lista de Compras</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Producto</Form.Label>
          <Form.Control
            type="text"
            value={producto}
            onChange={(e) => setProducto(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            value={precio}
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
      <Alerta
        estado={estadoAlerta}
        variante={"danger"}
        mensaje={"Los campos no estan completos!"}
      ></Alerta>
      <h5>Costo Total: {costoTotal}</h5>
      <Producto productos={productos} eliminar={eliminar}></Producto>
    </div>
  );
}

export default App;
