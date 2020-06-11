import React, { useContext, useEffect } from "react";
import { Image, Grid, Popup, Container } from "semantic-ui-react";
import PurchaseStore from "../../../app/stores/purchaseStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps, Link } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import PurchaseDetailedHeader from "./PurchaseDetailedHeader";

interface DetailParams {
  id: string;
}
const PurchaseDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const purchaseStore = useContext(PurchaseStore);
  const { purchase, loadPurchase, loadingInitial } = purchaseStore;

  useEffect(() => {
    loadPurchase(+match.params.id);
  }, [loadPurchase, match.params.id, history]);

  if (loadingInitial || !purchase)
    return <LoadingComponent content="Loading purchase..." />;

  return (
    <Grid>
      <Popup
        trigger={
          <Link to="/purchases">
            <Image
              style={{ marginRight: 160 }}
              src={`/assets/arrow.png`}
              wrapped
              ui={false}
            />
          </Link>
        }
        content="Back to purchases"
        position="top left"
      />

      <Grid.Column width={10}>
        <Container style={{ marginTop: 140, marginRight: 50 }}>
          <PurchaseDetailedHeader purchase={purchase!} />
        </Container>
      </Grid.Column>
    </Grid>
  );
};

export default observer(PurchaseDetails);
