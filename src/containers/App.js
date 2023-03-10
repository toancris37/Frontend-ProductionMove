import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import CustomScrollbars from '../components/CustomScrollbars';


import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import './App.scss'
import { path } from '../utils'

import Admin from '../routes/Admin';
import Home from '../routes/Home';
import Login from './Auth/Login';
import Factory from '../routes/Factory';
import ConfirmModal from '../components/ConfirmModal';
import DistributionAgent from '../routes/DistributionAgent';
import ServiceCenter from '../routes/ServiceCenter';

class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <ConfirmModal />
                        <CustomScrollbars style={{ height: '100vh', width: '100vw' }}>
                            <Switch>
                                <Route path={path.HOME} exact component={(Home)} />
                                <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                <Route path={path.ADMIN} component={userIsAuthenticated(Admin)} />
                                <Route path={path.FACTORY} component={userIsAuthenticated(Factory)} />
                                <Route path={path.SERVICE_CENTER} component={userIsAuthenticated(ServiceCenter)} />
                                <Route path={path.DISTRIBUTION_AGENT} component={userIsAuthenticated(DistributionAgent)} />

                                {/* <Route component={() => { return (<Redirect to={systemMenuPath} />) }} /> */}

                            </Switch>
                        </CustomScrollbars>

                        <ToastContainer
                            position="bottom-right"
                            autoClose={2000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="colored"
                        />

                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);