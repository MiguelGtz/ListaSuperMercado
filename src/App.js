import "./App.css";
import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import Producto from "./components/Productos";
import Alerta from "./components/Alerta";
import axios from "axios";

function App() {
  const [producto, setProducto] = useState("");
  const [precio, setPrecio] = useState(0);
  const [productos, setProductos] = useState([]);
  const [costoTotal, setCostoTotal] = useState(0.0);
  const [estadoAlerta, setEstadoAlerta] = useState(false);

  const cargar = async () => {
    const res = await axios.get("http://localhost:9000/productos");
    setCostoTotal(
      res.data.map((objeto) => objeto.precio).reduce((a, b) => a + b, 0)
    );
    setProductos(res.data);
  };

  useEffect(() => {
    cargar();
  }, []);

  const agregar = async (e) => {
    e.preventDefault();
    if (producto && precio) {
      try {
        await axios.post("http://localhost:9000/productos", {
          nombre: producto,
          precio: precio,
        });
        setCostoTotal(costoTotal + precio);
        setEstadoAlerta(false);
        cargar();
      } catch (error) {
        console.log(error);
      }
    } else {
      setEstadoAlerta(true);
    }
  };

  const eliminar = async (producto) => {
    try {
      await axios.delete(`http://localhost:9000/productos/${producto.id}`);
      setCostoTotal(costoTotal - producto.precio);
      cargar();
    } catch (error) {
      console.log(error);
    }
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
