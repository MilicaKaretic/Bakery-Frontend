import React from "react";
import EmployeeList from "./EmployeeList";
import { observer } from "mobx-react-lite";

const EmployeeDashboard: React.FC = () => {
  return (
    <div
      style={{
        justifyContent: "center",
      }}
    >
      <EmployeeList />
    </div>
  );
};

export default observer(EmployeeDashboard);
