import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Provider } from "react-redux";
//import { AuthProvider } from "./context/authContext"
import store from "./redux/store";
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './AppStyle';
import { CartProvider,useCart } from "react-use-cart";
import { ConfirmProvider } from 'material-ui-confirm';

//const Service =React.lazy(() => import('./pages/index'));
const RouterIndex =React.lazy(() => import('./pages/index'));
//const Login =React.lazy(() => import('./pages/home/login/login'));

//const ServiceCategory = React.lazy(() => import('./pages/serviceCategory/categoryMain'))

const HomePage = React.lazy(() => import('./pages/home/main/home'));
function App() {
  const classes = useStyles();
  return (
    <Provider store={store}>
      <div className="App">
      <ConfirmProvider>
        <CartProvider>
          <Router basename={'/beta'}>
          
              <Suspense fallback={<div className={classes.lodingContainer}>
                <CircularProgress className={classes.spinner} thickness={4} size={50} />
              </div>}>
                <Switch>
                  {/* <Route exact path='/' render={ ():any=>{window.location.href='/OurGenie/home.html'}} /> */}
                  {/* <Route exact path = '/' component={HomePage} />  */}
                  <RouterIndex/>
                  {/* <Route path='/home' component={Service} />
                  <Route path='/companyList' render={(): any => { window.location.href = '/OurGenie/company-list.html' }} /> */}
                </Switch>
              </Suspense>
              {/* <AuthProvider>
            </AuthProvider> */}
          </Router>
          </CartProvider>
        </ConfirmProvider>
      </div >
    </Provider>
  );
}

export default App;
