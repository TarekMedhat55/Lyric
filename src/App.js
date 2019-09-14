import React from 'react';
import './App.css';
import {BrowserRouter as Router , Route , Switch} from 'react-router-dom'
import Index from './components/layouts/Index';
import Navbar from './components/layouts/Navbar';
import { Provider } from './Context';
import Lyrics from './components/tracks/Lyrics';
function App() {
  return (
    <Provider>
      <Router>
        <React.Fragment>
        <Navbar/>
          <div className="container">
            <Switch>
              <Route exact path="/" component={Index}/>
              <Route path="/lyrics/track/:id" component={Lyrics}/>
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    </Provider>
  );
}

export default App;
