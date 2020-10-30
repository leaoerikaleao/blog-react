import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './assets/css/global.css';
import Home from './pages/Home';
import Header from './components/Header';
import firebase from './firebase';

class App extends Component {

  state = {
    // para verificar se existem alguém logado
    firebaseInitialzed: false
  }

  // executado depois que a saída do componente é renderizada no DOM
  componentDidMount() {
    firebase.isInitialized().then(result => {
      //Retorna para o usuário
      this.setState({
        firebaseInitialzed: result
      })
    })
  }

  render() {
    return this.state.firebaseInitialzed !== false ? (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    ) : (
        <h1>Carregando</h1>
      );
  }

}

export default App;
