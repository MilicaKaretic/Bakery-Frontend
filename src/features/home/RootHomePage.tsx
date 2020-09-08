import React from "react";
import { Container, Segment, Header, Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

const RootHomePage = () => {
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/placeholderBakery.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          Bakery
        </Header>
        <Header as="h2" inverted content="Welcome to Bakery" />
        <Button as={Link} to="/deliveries" size="huge" inverted>
          Go to Deliveries!
        </Button>
        <Button as={Link} to="/purchases" size="huge" inverted>
          Go to Purchases!
        </Button>
      </Container>
    </Segment>
  );
};

export default RootHomePage;
