// import React , { useState } from 'react'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom';
// import RoleBasedDashboard from './DashboardController'

// const Login = () => {
//     const [formData , setFormData] = useState({email: '', password: ''});
//     const handleChange = (e)=>{
//         setFormData({...formData , [e.target.name] : e.target.value} )
//     }

//     const navigate = useNavigate();

//     const handleSubmit = async (e)=>{
//         e.preventDefault();
//         try {
//             const res = await axios.post('http://localhost:3000/auth/login', formData);
//             console.log(res.data);
//             navigate('/dashboard');
//         } catch (error) {
//             console.log(error.response?.data?.message || error.message);
//             navigate('/Register')
//         }
//     }
//   return (
//     <div>
//         <form className='border-2 border-gray-600 m-5 max-w-6xl mx-auto flex flex-col' onSubmit={handleSubmit}>
//             <input className='border-1 border-black rounded-md text-2xl px-6 py-2 m-3' type="email" name="email" value={formData.email} onChange={handleChange} placeholder='Enter your email' required/>
//             <input className='border-1 border-black rounded-md text-2xl px-6 py-2 m-3' type="password"name="password"  value={formData.password} onChange={handleChange} placeholder='Enter your Password' required/>
//             <input className='border-1 border-black rounded-md text-2xl px-6 py-2 m-3 bg-green-600' type="submit" value='Login'/>
//         </form>
//     </div>
//   )
// }

// export default Login


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/auth/login', formData);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem('token', res.data.token);

      const role = res.data.user.role;
      if (role === 'farmer') navigate('/farmer/dashboard');
      else if (role === 'buyer') navigate('/buyer/dashboard');
      else if (role === 'admin') navigate('/admin/dashboard');
      else navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
      <div className='bg-gray-300 min-h-screen flex items-center justify-center pt-[70px]'>
        <form
          className="w-full max-w-md bg-gray-100 p-8 rounded-lg shadow-lg"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Login to AgriLink</h2>

          <input
            className="w-full mb-4 px-4 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            className="w-full mb-4 px-4 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 cursor-pointer transition"
            type="submit"
            value="Login"
          />

          {error && <p className="text-red-600 text-center mt-3">{error}</p>}

          <p className="text-center mt-4">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                  Register here
              </Link>
          </p>
        </form>
      </div>
  );
};

export default Login;
