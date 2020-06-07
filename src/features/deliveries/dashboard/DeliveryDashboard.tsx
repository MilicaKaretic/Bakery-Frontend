import React from "react";
import { Grid } from "semantic-ui-react";
import DeliveryList from "./DeliveryList";
import { observer } from "mobx-react-lite";

const DeliveryDashboard: React.FC = () => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <DeliveryList />
      </Grid.Column>
      <Grid.Column width={6}>
        {/* {editMode && <EditBookForm book={book!} />} */}
      </Grid.Column>
    </Grid>
  );
};

export default observer(DeliveryDashboard);
