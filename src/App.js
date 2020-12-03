import './App.css';
import JSXApp from './components/App';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
          <Route path="/" component={JSXApp} exact />
          <Route path="/states" component={JSXApp} exact/>
          <Route path="/lgas" component={JSXApp} exact/>
          <Route path="/wards" component={JSXApp} exact/>
          <Route path="/polling-units" component={JSXApp} exact/>
          <Route path="/results" component={JSXApp} exact/>
      </Switch>
    </div>
  );
}

export default App;
