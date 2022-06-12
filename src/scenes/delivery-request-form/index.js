import React from "react";
import Form from "./components/form";

export default function DeliveryRequestForm(props) {
  const title = props.route.params.title;

  return (
    <Form title={title} />
  );
}