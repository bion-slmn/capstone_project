// Example route config for React Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import RegisterClient from './pages/RegisterClient';
import RegisterRider from './pages/RegisterRider';
import Bikes from './pages/Bikes';
import Bookings from './pages/Bookings';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register-client" element={<RegisterClient />} />
                <Route path="/register-rider" element={<RegisterRider />} />
                <Route path="/bikes" element={<Bikes />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}
