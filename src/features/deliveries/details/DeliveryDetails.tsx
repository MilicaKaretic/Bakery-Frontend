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

      <Grid.Column width={10}>
        <Container style={{ marginTop: 140, marginRight: 50 }}>
          <DeliveryDetailedHeader delivery={delivery!} />
        </Container>
      </Grid.Column>
    </Grid>
    //  <Card fluid>
    //   <Image src={`/assets/placeholder_book.jpg`} wrapped ui={false} />
    //   <Card.Content>
    //     <Card.Header>{book!.Title}</Card.Header>
    //     <Card.Meta>
    //       <span>{book!.Writer.WriterName}</span>
    //     </Card.Meta>
    //     <Card.Meta>
    //       <span>{book!.Genre.GenreName}</span>
    //     </Card.Meta>
    //     <Card.Description>
    //       Number of available copies: {book!.NumberOfAvailable}
    //     </Card.Description>
    //   </Card.Content>
    //   <Card.Content extra>
    //     <Button.Group widths={2}>
    //       <Modal
    //         dimmer="blurring"
    //         trigger={
    //           <Button
    //             basic
    //             onClick={() => openEditForm(book!.BookID)}
    //             color="blue"
    //             content="Edit"
    //           >
    //             Edit
    //           </Button>
    //         }
    //         closeIcon
    //       >
    //         <Modal.Content>
    //           <EditBookForm book={book!} />
    //         </Modal.Content>
    //       </Modal>
    //       {/*    <Button
    //         basic
    //         onClick={() => openEditForm(book!.BookID)}
    //         color="blue"
    //         content="Edit"
    //       /> */}
    //       <Button
    //         onClick={() => history.push("/books")}
    //         basic
    //         color="red"
    //         content="Cancel"
    //       />
    //     </Button.Group>
    //   </Card.Content>
    // </Card>
  );
};

export default observer(DeliveryDetails);
