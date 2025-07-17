import React, { useState } from "react";
import axios from "axios";
import { useNavigate,Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        mobile: "",
        role: "",
        location: "",
    });

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleData = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" }); 
    };

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validateForm = () => {
        const newErrors = {};
        const { name, email, password, mobile, role, location } = formData;

        if (!name.trim()) newErrors.name = "Name is required";
        if (!email.trim()) newErrors.email = "Email is required";
        else if (!validateEmail(email)) newErrors.email = "Invalid email format";
        if (!password) newErrors.password = "Password is required";
        else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
        if (!mobile.trim()) newErrors.mobile = "Mobile number is required";
        else if (mobile.length < 10) newErrors.mobile = "Mobile number must be at least 10 digits";
        if (!role) newErrors.role = "Please select a role";
        if (!location.trim()) newErrors.location = "Location is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const res = await axios.post("http://localhost:3000/auth/register", formData);
            alert('Registration successful. Please Login.');
            navigate('/login');
        } catch (error) {
            console.log(error.response?.data?.message || error.message);
            if (error.response?.data?.message === "User already exists please login") {
                alert('User already exists please login')
                navigate('/login');
            } else {
                alert("Registration Failed");
            }
        }
    };

    return (
        <div className='bg-gray-300 min-h-screen flex items-center justify-center pt-[70px]'>
            <form onSubmit={handleSubmit} className='border-2 border-black max-w-2xl w-full flex flex-col m-5 p-5 bg-white shadow-xl rounded-xl'>
                <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Register to AgriLink</h2>
                <label className='mt-2 font-semibold'>Name</label>
                <input
                    className='border-2 border-black mt-1 px-6 py-2 rounded-2xl'
                    type="text"
                    name="name"
                    value={formData.name}
                    placeholder="Enter your name"
                    onChange={handleData}
                />
                {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
                <label className='mt-4 font-semibold'>Email</label>
                <input
                    className='border-2 border-black mt-1 px-6 py-2 rounded-2xl'
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="Enter your email"
                    onChange={handleData}
                />
                {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
                <label className='mt-4 font-semibold'>Password</label>
                <input
                    className='border-2 border-black mt-1 px-6 py-2 rounded-2xl'
                    type="password"
                    name="password"
                    value={formData.password}
                    placeholder="Enter a strong password"
                    onChange={handleData}
                />
                {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
                <label className='mt-4 font-semibold'>Mobile</label>
                <input
                    className='border-2 border-black mt-1 px-6 py-2 rounded-2xl'
                    type="number"
                    name="mobile"
                    value={formData.mobile}
                    placeholder="Enter your mobile number"
                    onChange={handleData}
                />
                {errors.mobile && <p className="text-red-600 text-sm">{errors.mobile}</p>}
                <label className='mt-4 font-semibold'>Role</label>
                <select
                    className='border-2 border-black mt-1 px-6 py-2 rounded-2xl'
                    name="role"
                    value={formData.role}
                    onChange={handleData}
                >
                    <option value="">Select Role</option>
                    <option value="farmer">Farmer</option>
                    <option value="buyer">Buyer</option>
                </select>
                {errors.role && <p className="text-red-600 text-sm">{errors.role}</p>}
                <label className='mt-4 font-semibold'>Location</label>
                <input
                    className='border-2 border-black mt-1 px-6 py-2 rounded-2xl'
                    type="text"
                    name="location"
                    value={formData.location}
                    placeholder="Enter your location"
                    onChange={handleData}
                />
                {errors.location && <p className="text-red-600 text-sm">{errors.location}</p>}
                <input
                    className='bg-green-500 hover:bg-green-600 text-white font-semibold mt-6 px-6 py-2 rounded-2xl cursor-pointer'
                    type="submit"
                    value="Register"
                />
                <p className="text-center mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Login here
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
