import React from "react";
import ClientCard from "./ClientCard";
import "./ClientStyle.css"

const ClientsList = (props) => {

  return (
    <div className="clients-list">
      {props.clients.map((client, index) => {
        return (
          <ClientCard
            key={index}
            id={client.id}
            name={client.name}
            email={client.email}
            city={client.city}
            render={props.render}
            state={props.state}
          />
        );
      })}
    </div>
  );
};

export default ClientsList;
