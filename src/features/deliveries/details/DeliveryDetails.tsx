import React, { useContext, useEffect } from "react";
import { Image, Grid, Popup, Container } from "semantic-ui-react";
import DeliveryStore from "../../../app/stores/deliveryStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps, Link } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import DeliveryDetailedHeader from "./DeliveryDetailedHeader";

interface DetailParams {
  id: string;
}
const DeliveryDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const deliveryStore = useContext(DeliveryStore);
  const { delivery, loadDelivery, loadingInitial } = deliveryStore;

  useEffect(() => {
    loadDelivery(+match.params.id);
  }, [loadDelivery, match.params.id, history]);

  if (loadingInitial || !delivery)
    return <LoadingComponent content="Loading delivery..." />;

  return (
    <Grid>
      <Popup
        trigger={
          <Link to="/deliveries">
            <Image
              style={{ marginRight: 160 }}
              src={`/assets/arrow.png`}
              wrapped
              ui={false}
            />
          </Link>
        }
        content="Back to deliveries"
        position="top left"
      />

      <Grid.Column width={7}>
        <Container style={{ marginTop: 5, marginRight: 50 }}>
          <DeliveryDetailedHeader delivery={delivery!} />
        </Container>
      </Grid.Column>
    </Grid>
   
  );
};

export default observer(DeliveryDetails);
