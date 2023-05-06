import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BookingForm from './components/BookingForm';
import Data from './components/Data';
import ShowDetails from './components/ShowDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Data} />
          <Route path="/shows/:id" component={ShowDetails} />
          <Route path="/book/:showName" component={BookingForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
