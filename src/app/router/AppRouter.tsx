import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { DASHBOARD_PAGES } from '../config/pages-url.config';
import Auth from 'pages/auth';
import Me from 'pages/Me';
import TimeBlocking from 'pages/TimeBlocking/components/TimeBlock/TimeBlocking';
import Customize from 'pages/Customize';
import ErrorPage from 'pages/ErrorPage';
import App from 'app/App';

export function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path={DASHBOARD_PAGES.HOME} element={<App />} />
                <Route path={DASHBOARD_PAGES.AUTH} element={<Auth />} />
                <Route path={DASHBOARD_PAGES.ME} element={<Me />} />
                <Route path={DASHBOARD_PAGES.TIME_BLOCKING} element={<TimeBlocking />} />
                <Route path={DASHBOARD_PAGES.CUSTOMIZE} element={<Customize />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </Router>
    );
}
