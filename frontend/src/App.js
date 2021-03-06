import React from 'react';
import './App.css';
import Nav from './components/nav';
import About from './components/about';
import List from './components/list';
import Form from './components/form';
import NotFound from './components/notfound';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/list" component={List} />
          <Route path="/form" component={Form} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

const Home = () => (
  <div>
    <h1>Home</h1>
  </div>
)

export default App;
