import React from "react";
import PurchaseList from "./PurchaseList";
import { observer } from "mobx-react-lite";

const PurchaseDashboard: React.FC = () => {
  return (
    <div
      style={{
        justifyContent: "center",
      }}
    >
      <PurchaseList />
    </div>
  );
};

export default observer(PurchaseDashboard);
