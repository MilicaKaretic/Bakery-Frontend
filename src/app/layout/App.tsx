import React, { useEffect, Fragment, useContext } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import DeliveryDashboard from "../../features/deliveries/dashboard/DeliveryDashboard";
import PurchaseDashboard from "../../features/purchases/dashboard/PurchaseDashboard";
import LoadingComponent from "./LoadingComponent";
import DeliveryStore from "../stores/deliveryStore";
import PurchaseStore from "../stores/purchaseStore";
import EmployeeStore from "../stores/employeeStore";
import LoginStore from "../stores/loginStore";
import { observer } from "mobx-react-lite";
import { Route, Switch } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import CreateDeliveryForm from "../../features/deliveries/form/CreateDeliveryForm";
import CreatePurchaseForm from "../../features/purchases/form/CreatePurchaseForm";
import DeliveryDetails from "../../features/deliveries/details/DeliveryDetails";
import PurchaseDetails from "../../features/purchases/details/PurchaseDetails";
import NotFound from "./NotFound";
import { ToastContainer } from "react-toastify";
import EmployeeDashboard from "../../features/employees/dashboard/EmployeeDashboard";
import EmployeeDetails from "../../features/employees/details/EmployeeDetails";
import CreateEmployeeForm from "../../features/employees/form/CreateEmployeeForm";
import LoginForm from "../../features/Login/LoginForm"
import { history } from "../..";

const App = () => {
  const deliveryStore = useContext(DeliveryStore);
  const purchaseStore = useContext(PurchaseStore);
  const employeeStore = useContext(EmployeeStore);
  const loginStore = useContext(LoginStore);
  const { isEmployeeAuth } = loginStore;

  useEffect(() => {
    deliveryStore.loadDeliveries();
    purchaseStore.loadPurchases();
    employeeStore.loadEmployees();
  }, [deliveryStore, purchaseStore,employeeStore]);

  useEffect(() => {
    console.log("test");
    history.listen(({ pathname }) => {
      console.log(pathname);
      if (pathname === "/deliveries" && isEmployeeAuth) {
        deliveryStore.loadDeliveries();
      }
    });
  }, []);

  if (deliveryStore.loadingInitial)
    return <LoadingComponent inverted={true} content="Loading deliveries..." />;
    if (purchaseStore.loadingInitial)
    return <LoadingComponent inverted={true} content="Loading purchases..." />;
    if (employeeStore.loadingInitial)
    return <LoadingComponent inverted={true} content="Loading employees..." />;


  return (

    <Fragment>
      <Switch>
      {!isEmployeeAuth && <Route component={LoginForm} />}
        <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar />

            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route exact path="/deliveries" component={DeliveryDashboard} />
                <Route path="/deliveries/:id" component={DeliveryDetails} />
                <Route path="/createDelivery" component={CreateDeliveryForm} />
                <Route exact path="/purchases" component={PurchaseDashboard} />
                <Route path="/purchases/:id" component={PurchaseDetails} />
                <Route path="/createPurchase" component={CreatePurchaseForm} />
                <Route exact path="/employees" component={EmployeeDashboard} />
                <Route path="/employees/:id" component={EmployeeDetails} />
                <Route path="/createEmploye" component={CreateEmployeeForm} />
                <Route component={NotFound} />
              </Switch>
            </Container>
            
          </Fragment>
        )}
      />
      </Switch>
    </Fragment>
  );
};

export default observer(App);
