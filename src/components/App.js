import React from 'react';
import './App.css';
import { useStateValue } from '../context/StateProvider';
import AuthScreen from './AuthScreen';
import SignUpForm from './form/SignUpForm';
import LoginForm from './form/LoginForm';
import ForgotPasswordForm from './form/ForgotPasswordForm';
import Dashboard from './dashboard/Dashboard';
import { 
    BrowserRouter as Router, 
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

function App() {
    const [{ user }] = useStateValue();

    const DisplayUserForm = () => (
        <Switch>
            <Route exact path="/forgot-password" component={ForgotPasswordForm} />
            <Route exact path="/signup" component={SignUpForm} />
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/" component={AuthScreen} />
            <Route
                render={() => <Redirect to="/" />}
              />
        </Switch>
    );

    return (
        <div className="app">
            <Router>
                {!user ? (<DisplayUserForm />)
                : (
                    <div className="app__dashboard">
                        <Switch>
                            <Route path="/human-resource" component={Dashboard} />

                            <Route 
                                render={() => <Redirect to="/human-resource" />}
                            />
                        </Switch>
                    </div>
                )}
            </Router>
        </div>
    );
}

export default React.memo(App);
