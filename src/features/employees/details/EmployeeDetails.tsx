import React, { useContext, useEffect } from "react";
import { Image, Grid, Popup, Container } from "semantic-ui-react";
import EmployeeStore from "../../../app/stores/employeeStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps, Link } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import EmployeeDetailedHeader from "./EmployeeDetailedHeader";

interface DetailParams {
  id: string;
}
const EmployeeDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const employeeStore = useContext(EmployeeStore);
  const { employee, loadEmployee, loadingInitial } = employeeStore;

  useEffect(() => {
    loadEmployee(+match.params.id);
  }, [loadEmployee, match.params.id, history]);

  if (loadingInitial || !employee)
    return <LoadingComponent content="Loading employee..." />;

  return (
    <Grid>
      <Popup
        trigger={
          <Link to="/employees">
            <Image
              style={{ marginRight: 160 }}
              src={`/assets/arrow.png`}
              wrapped
              ui={false}
            />
          </Link>
        }
        content="Back to employees"
        position="top left"
      />

      <Grid.Column width={10}>
        <Container style={{ marginTop: 140, marginRight: 50 }}>
          <EmployeeDetailedHeader employee={employee!} />
        </Container>
      </Grid.Column>
    </Grid>
  );
};

export default observer(EmployeeDetails);
