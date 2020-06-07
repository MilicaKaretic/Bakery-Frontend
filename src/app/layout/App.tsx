import React, { useEffect, Fragment, useContext } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import DeliveryDashboard from "../../features/deliveries/dashboard/DeliveryDashboard";
import LoadingComponent from "./LoadingComponent";
import DeliveryStore from "../stores/deliveryStore";
import { observer } from "mobx-react-lite";
import { Route, Switch } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import CreateDeliveryForm from "../../features/deliveries/form/CreateDeliveryForm";
import DeliveryDetails from "../../features/deliveries/details/DeliveryDetails";
import NotFound from "./NotFound";
import { ToastContainer } from "react-toastify";
const App = () => {
  const deliveryStore = useContext(DeliveryStore);

  useEffect(() => {
    deliveryStore.loadDeliveries();
  }, [deliveryStore]);

  if (deliveryStore.loadingInitial)
    return <LoadingComponent inverted={true} content="Loading deliveries..." />;

  return (
    <Fragment>
      <ToastContainer position="top-center" />
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
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default observer(App);
