import React from "react";
import DeliveryList from "./DeliveryList";
import { observer } from "mobx-react-lite";

const DeliveryDashboard: React.FC = () => {
  return (
    <div
      style={{
        justifyContent: "center",
      }}
    >
      <DeliveryList />
    </div>
  );
};

export default observer(DeliveryDashboard);
