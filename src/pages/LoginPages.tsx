import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext) as any;
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      navigate('/'); // Send to catalog on success
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign In</h2>
        
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm text-center">{error}</div>}
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-primary"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-medium">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-primary"
              required
            />
          </div>
          <button type="submit" className="w-full bg-dark text-white py-3 rounded-full hover:bg-primary font-bold transition-all">
            Login
          </button>
        </form>

        {/* Cheat sheet for the students testing the app */}
        <div className="mt-6 border-t pt-4 text-xs text-gray-500 bg-gray-50 p-3 rounded">
          <p className="font-bold mb-1">Test Credentials:</p>
          <p>Admin: admin@store.com / admin123</p>
          <p>Staff: staff@store.com / staff123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;