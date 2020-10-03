import React from 'react';
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './app.css';
import Landing from './../landing/landing';
import Months from './../months/months';
import Weeks from './../weeks/weeks';
import Week from './../week/week'
import MonthReview from './../weeks/monthReview';
import YearReview from './../months/yearReview';

function App() {

  return (
    <Router>
      <Link to="/" className="link">
        <h1 className="title">GRIT</h1>
      </Link>  
      <div className="nav-bar">

      </div>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/:year" exact component={Months} />
          <Route path="/:year/yearReview" component={YearReview} />
          <Route path="/:year/:monthAndMonthId" exact component={Weeks} />
          <Route path="/:year/:monthAndMonthId/monthReview"  component={MonthReview} />
          <Route path="/:year/:monthAndMonthId/:weekId" exact component={Week} /> {/* using HashRouter would also render landing component instead of just rendering week component. BrowserRouter worked. Why? */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
