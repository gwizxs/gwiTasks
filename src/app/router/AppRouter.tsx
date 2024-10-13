import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { DASHBOARD_PAGES } from '../config/pages-url.config';
import Auth from 'pages/auth';
import Me from 'pages/Me';
import TimeBlocking from 'pages/About/TimeBlocking';
import Customize from 'pages/Customize';
import ErrorPage from 'pages/ErrorPage';
import App from 'app/App';



export function AppRouter() {
    return (
       <Router>
          <Routes>
             <Route path={ DASHBOARD_PAGES.HOME} element={<App />} errorElement={<ErrorPage />}></Route>
                <Route path={DASHBOARD_PAGES.AUTH} element={<Auth />} errorElement={<ErrorPage />}></Route>
                <Route path={DASHBOARD_PAGES.ME} element={<Me />} errorElement={<ErrorPage />}></Route>
                <Route path={DASHBOARD_PAGES.TIME_BLOCKING} element={<TimeBlocking />} errorElement={<ErrorPage />}></Route>
                <Route path={ DASHBOARD_PAGES.CUSTOMIZE} element={<Customize />} errorElement={<ErrorPage />}></Route>
          </Routes>
       </Router>
    ); 
 }