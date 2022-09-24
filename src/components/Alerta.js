import React from "react";
import { Alert } from "react-bootstrap";

function Alerta(props) {
  if (props.estado) {
    return <Alert variant={props.variante}>{props.mensaje}</Alert>;
  }
}

export default Alerta;
