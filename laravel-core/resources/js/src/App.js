import React from 'react';
// import './css/styles.css'
import HomeScreen from './screens/HomeScreen';
import LandingScreen from './screens/auth/LandingScreen';
import UserPanelScreen from './screens/UserPanelScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import LoginScreen from './screens/auth/LoginScreen';
import UserConfirm from './screens/auth/UserConfirm';
import Test from './screens/TestScreen';
import FamilyTestIncompleted from './screens/FamilyTestIncompleteScreen';
import FamilyTestCompleted from './screens/FamilyTestCompleteScreen';
import FamilyTestRetain from './screens/FamilyTestRetainScreen';
import RegisterScreenForm1 from './screens/auth/RegisterScreenForm1';
import RegisterScreenForm2 from './screens/auth/RegisterScreenForm2';
import SignupTable from './screens/auth/SignupTable';
import FamilySupervisor from './screens/auth/FamilySupervisor';
import AdminPanel from './screens/admin/AdminPanel';
import AdminPanelFiles from './screens/admin/AdminPanelFiles';
import ChartScreen from './screens/ChartScreen';
import IntergrationTable from './components/IntegrationTable';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import QuestionsContextProvider from './context/QuestionsContext';
import AlertsContextProvider from './context/AlertsContext';
import RegisterContextProvider from './context/RegisterContext';
import ThemeContextProvider from './context/ThemeContext';
import Spinner from './components/Spinner';
import LoadingContextProvider from './context/LoadingContext';

function App() {
  return (
    <AlertsContextProvider>
      <QuestionsContextProvider>
        <ThemeContextProvider>
          <LoadingContextProvider>
            <Router>
              <Route path="/" component={HomeScreen} exact />
              <Route path="/authentication" component={LandingScreen} exact />
              <Route path="/login" component={LoginScreen} />
              <Route
                path="/user-confirm/:phoneNumber"
                component={UserConfirm}
              />
              <RegisterContextProvider>
                <Route path="/register" component={RegisterScreen} exact />
                <Route
                  path="/register/form-1"
                  component={RegisterScreenForm1}
                />
                <Route
                  path="/register/form-2"
                  component={RegisterScreenForm2}
                />
                <Route path="/register/signup-table" component={SignupTable} />
                <Route
                  path="/register/family-supervisor"
                  component={FamilySupervisor}
                />
              </RegisterContextProvider>
              <Route path="/admin-panel" component={AdminPanel} exact />
              <Route path="/admin-panel/charts" component={ChartScreen} />
              <Route path="/admin-panel/files" component={AdminPanelFiles} />
              <Route path="/dashboard" component={UserPanelScreen} />
              <Route path="/test/:person" component={Test} exact />
              <Route
                path="/test/:person/not-complete"
                component={FamilyTestIncompleted}
              />
              <Route path="/test/:person/retain" component={FamilyTestRetain} />
              <Route
                path="/test/:person/completed"
                component={FamilyTestCompleted}
              />
              <Route path="/table" component={IntergrationTable} />
              <Route path="/spinner" component={Spinner} />
            </Router>
          </LoadingContextProvider>
        </ThemeContextProvider>
      </QuestionsContextProvider>
    </AlertsContextProvider>
  );
}

export default App;
