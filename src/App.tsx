import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext'; // 1. Import AuthProvider
import Navbar from './components/NavBar';
import LandingPage from './pages/LandingPage';
import Catalog from './pages/Catalog';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPages';
import ProtectedRoute from './components/ProtectedRoute';
import OrderHistory from './pages/OrderHistory';
import CustomerOrderHistory from './pages/CustomerOrderHistory';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import POS from './pages/POS';
import ManageMenu from './pages/ManageMenu';
import ManageInventory from './pages/ManageInventory';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-white flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/menu" element={<Catalog />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/my-orders" element={<CustomerOrderHistory />} />
                
                {/* Protected Route: Order history only for logged in staff/admin */}
                <Route path="/history" element={
                  <ProtectedRoute>
                    <OrderHistory />
                  </ProtectedRoute>
                } />

                {/* POS: Point of Sale for staff */}
                <Route path="/pos" element={
                  <ProtectedRoute>
                    <POS />
                  </ProtectedRoute>
                } />

                {/* Manage Menu: ONLY admins */}
                <Route path="/manage-menu" element={
                  <ProtectedRoute requireAdmin={true}>
                    <ManageMenu />
                  </ProtectedRoute>
                } />

                {/* Manage Inventory: ONLY admins */}
                <Route path="/manage-inventory" element={
                  <ProtectedRoute requireAdmin={true}>
                    <ManageInventory />
                  </ProtectedRoute>
                } />

                {/* Protected Route: ONLY admins/staff can see the dashboard */}
                <Route path="/admin" element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;