import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import DogCreate from './components/DogCreate';
import CardDetail from './components/CardDetail';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route exact path='/home' component={Home}/>
        <Route exact path='/dog' component={DogCreate}/>
        <Route exact path='/home/:id' component={CardDetail}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
