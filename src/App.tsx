import React, {Component} from 'react';
import {Header, Icon, List} from 'semantic-ui-react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    values: []
  };

  componentDidMount() {
    axios.get('http://localhost:8081/api/employees').then(response => {
      this.setState({
        values: response.data
      });
    });
  }

  render() {
    return (
      <div>
        <Header as='h2'>
          <Icon name='users' />
          <Header.Content>Adminssss</Header.Content>
        </Header>
        <List>
          {this.state.values.map((value: any) => (
            <List.Item key={value.Employee}>{value.EmployeeName}</List.Item>
          ))}
        </List>
      </div>
    );
  }
}

export default App;
