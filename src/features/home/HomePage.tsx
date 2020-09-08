import React, { Fragment, useContext, useState } from "react";
import { Container, Segment, Header, Button, Image, Modal } from "semantic-ui-react";
import { Link } from "react-router-dom";
import LoginStore from "../../app/stores/loginStore";
import LoginForm from "../../features/Login/LoginForm";
import LoginAdminForm from "../../features/Login/LoginAdminForm";


const HomePage = () => {
  const loginStore = useContext(LoginStore);
  const { isEmployeeAuth, isAdminAuth } = loginStore;

  const [openLoginModal, setOpenLoginModal] = useState(false);
  const handleCloseLoginModal = () => setOpenLoginModal(false);

  const [openLoginAModal, setOpenLoginAModal] = useState(false);
  const handleCloseLoginAModal = () => setOpenLoginAModal(false);

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
        <Fragment>
          <Modal
            onFocus={(e: any) => e.stopPropagation()}
            open={openLoginModal}
            dimmer="blurring"
            trigger={
              <Button name="login" onClick={() => setOpenLoginModal(true)}>
                Login as Employee
              </Button>
            }
            onClose={handleCloseLoginModal}
          >
            <Modal.Content>
              <LoginForm />
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={handleCloseLoginModal}>Close</Button>
            </Modal.Actions>
          </Modal>
        </Fragment>

        <Fragment>
          <Modal
            onFocus={(e: any) => e.stopPropagation()}
            open={openLoginAModal}
            dimmer="blurring"
            trigger={
              <Button name="login" onClick={() => setOpenLoginAModal(true)}>
                Login as Administrator
              </Button>
            }
            onClose={handleCloseLoginAModal}
          >
            <Modal.Content>
              <LoginAdminForm />
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={handleCloseLoginAModal}>Close</Button>
            </Modal.Actions>
          </Modal>
        </Fragment>
        
        {/* <Button as={Link} to="/deliveries" size="huge" inverted>
          Take me to the Deliveries!
        </Button>
        <Button as={Link} to="/purchases" size="huge" inverted>
          Take me to the Purchases!
        </Button> */}

        
        
      </Container>
    </Segment>
  );
};

export default HomePage;
