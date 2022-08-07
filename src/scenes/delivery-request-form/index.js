import React from "react";
import Form from "./components/form";

export default function DeliveryRequestForm(props) {
  const title = props.route.params.title;
  const shipping = props.route.params.shipping ? props.route.params.shipping : {} ;

  return (
    <Form title={ title } shipping={ shipping } />
  );
}