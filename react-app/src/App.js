import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NavBar from './components/NavBar/NavBar';
// import ProtectedRoute from './components/auth/ProtectedRoute';
// import UsersList from './components/UsersList';
// import User from './components/User';
import { authenticate } from './store/session';
import HomePage from './components/HomePage/homePage';
import AllCoffee from './components/allCoffee/allCoffee';
import SingleCoffee from './components/singleCoffee/singleCoffee';
import Footer from './components/Footer/footer';
import NewCoffee from './components/newCoffee/newCoffee';
import CurrentCoffee from './components/currentCoffee/currentCoffee';
import EditCoffee from './components/editCoffee/editCoffee';
import UserReviews from './components/userReviews/userReviews';
import EditReview from './components/editReview/editReview';
import AddReview from './components/coffeeReviews/createReview';
import Roasters from './components/roasters/roasters';
import Checkout from './components/cart/checkout';
import AccountDetails from './components/accountDetails/accountDetails';
import LearnMore from './components/learnMore/learnMore';
import Preferences from './components/preferences/preferences';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/cawfee/new' exact={true} >
          <NewCoffee />
          <Footer />
        </Route>
        <Route exact path='/cawfee/:coffeeId'>
          <SingleCoffee/>
          <Footer />
        </Route>
        <Route exact path='/cawfee/edit/:coffeeId'>
          <EditCoffee/>
        </Route>
        <Route exact path='/cawfee'>
          <AllCoffee />
        </Route>
        <Route exact path='/my-curations'>
          <CurrentCoffee/>
        </Route>
        <Route exact path='/cawfee/:coffeeId/reviews/:reviewId/edit'>
          <EditReview/>
        </Route>
        <Route exact path='/my-reviews'>
          <UserReviews />
        </Route>
        <Route exact path='/reviews/:coffeeId/new'>
          <AddReview />
        </Route>
        <Route exact path='/checkout'>
          <Checkout />
        </Route>
        <Route exact path='/roasters'>
          <Roasters />
          <Footer />
        </Route>
        <Route path='/account'>
          <AccountDetails />
          <Footer />
        </Route>
        <Route path='/learn-more'>
          <LearnMore />
          <Footer />
        </Route>
        <Route path='/my-profile'>
          <Preferences />
          <Footer />
        </Route>
        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}
        <Route path='/' exact={true} >
          <HomePage />
          <Footer />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
