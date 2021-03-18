import React, { Component, Suspense  } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
 
import {Home, LoadingMessage, ErrorPage} from './components/';
 
const About = React.lazy(() => import('./components/Pages/About'));
const Contact = React.lazy(() => import('./components/Pages/Contact'));
const Data = React.lazy(() => import('./components/Pages/Data'));
const Map = React.lazy(() => import('./components/Pages/Map'));

class App extends Component {

  render() {
    return (     
       <Router basename={process.env.PUBLIC_URL}>
        <div>
          <Suspense fallback={<LoadingMessage />}>
              <Switch>
                <Route path="/" component={Home} exact/>
                <Route path="/map" component={Map}/>
                <Route path="/map.html" component={Map}/>
                <Route path="/about" component={About}/>
                <Route path="/about.html" component={About}/>
                <Route path="/contact" component={Contact}/>
                <Route path="/contact.html" component={Contact}/>
                <Route path="/data" component={Data}/>
                <Route path="/data.html" component={Data}/>
                <Route component={ErrorPage} />
                <Route />
            </Switch>
          </Suspense>
        </div> 
      </Router>
    );
  }
}

export default App