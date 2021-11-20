import React, { useEffect, Suspense  } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
 
import ReactGA from 'react-ga'
import { createBrowserHistory } from "history";
import {Home, LoadingMessage, ErrorPage} from './components/';
 
const Map = React.lazy(() => import('./components/Pages/Map'));
const About = React.lazy(() => import('./components/Pages/About'));
const Contact = React.lazy(() => import('./components/Pages/Contact'));
const Data = React.lazy(() => import('./components/Pages/Data'));

ReactGA.initialize('UA-213370928-1');

export default function App() {
    const history = createBrowserHistory();

    history.listen(location => {
      ReactGA.set({ page: location.pathname });
      ReactGA.pageview(location.pathname);
    });

    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search)
    }, [history])

    return (     
      <Router basename={process.env.PUBLIC_URL} history={history}>
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