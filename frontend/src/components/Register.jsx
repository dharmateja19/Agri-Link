// import React, { useState } from "react";
// import axios from "axios";
// import {useNavigate} from 'react-router-dom'

// const Register = () => {
//     const [formData, setFormData] = useState({
//         name : "",
//         email: "",
//         password: "",
//         mobile: "",
//         role: "",
//         location : "",
//     });

//     const  navigate = useNavigate()
//     const handleData = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post("http://localhost:3000/auth/register",formData);
//             alert('Registration successful. Please Login.')
//             navigate('/login')
//         } catch (error) {
//             console.log(error.response?.data?.message || error.message);
//             if(error.response?.data?.message === "User already exists"){
//                 navigate('/login')
//             }
//             else {
//                 console.log("Registration Failed");
//             }
//         }
//     };

//     return (
//         <div className='bg-gray-300'>
//             <form onSubmit={handleSubmit} className='border-2 border-black max-w-5xl mx-auto flex flex-col m-10 p-5'>
//                 <input className='border-2 border-black mt-5 px-6 py-2 rounded-2xl' type="text" name="name" value={formData.name} onChange={handleData}/>
//                 <input className='border-2 border-black mt-5 px-6 py-2 rounded-2xl' type="email" name="email" value={formData.email} onChange={handleData}/>
//                 <input className='border-2 border-black mt-5 px-6 py-2 rounded-2xl' type="password" name="password" value={formData.password} onChange={handleData}/>
//                 <input className='border-2 border-black mt-5 px-6 py-2 rounded-2xl' type="number" name="mobile" value={formData.mobile} onChange={handleData}/>
//                 <select className='border-2 border-black mt-5 px-6 py-2 rounded-2xl' name="role" id="role" value={formData.role} onChange={handleData}>
//                     <option value="farmer">Farmer</option>
//                     <option value="buyer">Buyer</option>
//                 </select>
//                 <input className='border-2 border-black mt-5 px-6 py-2 rounded-2xl' type="text" name="location" value={formData.location} onChange={handleData}/>
//                 <input className='border-2 border-black mt-5 px-6 py-2 rounded-2xl' type="submit"/>
//             </form>
//         </div>
//     )
// }

// export default Register;

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
        setErrors({ ...errors, [e.target.name]: "" }); // clear error on change
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

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//     const [formData, setFormData] = useState({
//         name: "", email: "", password: "",
//         mobile: "", role: "", location: ""
//     });
//     const [errors, setErrors] = useState({});
//     const [showOtp, setShowOtp] = useState(false);
//     const [otp, setOtp] = useState('');
//     const [otpVerified, setOtpVerified] = useState(false);
//     const [cooldown, setCooldown] = useState(0);
//     const navigate = useNavigate();

//     // Automatically send OTP when mobile is 10 digits
//     useEffect(() => {
//         if (formData.mobile.length === 10 && !otpVerified && cooldown === 0 && !showOtp) {
//             sendOtp();
//         }
//     }, [formData.mobile]);

//     useEffect(() => {
//         if (cooldown > 0) {
//             const t = setTimeout(() => setCooldown(cooldown - 1), 1000);
//             return () => clearTimeout(t);
//         }
//     }, [cooldown]);

//     const sendOtp = async () => {
//         if (cooldown > 0 || otpVerified || !/^\d{10}$/.test(formData.mobile)) return;

//         try {
//             const res = await axios.post('http://localhost:3000/otp/send-otp', {
//                 mobile: `+91${formData.mobile}`,
//             });
//             alert(res.data.message || "OTP sent");
//             setShowOtp(true);
//             setCooldown(30); // 30-second resend cooldown
//         } catch (err) {
//             alert(err.response?.data?.error || 'Failed to send OTP');
//         }
//     };

//     const verifyOtp = async () => {
//         try {
//             const res = await axios.post('http://localhost:3000/otp/verify-otp', {
//                 mobile: `+91${formData.mobile}`,
//                 otp,
//             });
//             if (res.data.success || res.data.message === "OTP verified") {
//                 alert('✅ OTP Verified');
//                 setOtpVerified(true);
//             }
//         } catch (err) {
//             alert('❌ Invalid or expired OTP');
//         }
//     };

//     const handleData = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//         setErrors({ ...errors, [e.target.name]: "" });
//         if (e.target.name === "mobile") {
//             setOtpVerified(false);
//             setShowOtp(false);
//             setCooldown(0);
//             setOtp('');
//         }
//     };

//     const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//     const validateForm = () => {
//         const { name, email, password, mobile, role, location } = formData;
//         const newErrors = {};

//         if (!name.trim()) newErrors.name = "Name is required";
//         if (!email.trim()) newErrors.email = "Email is required";
//         else if (!validateEmail(email)) newErrors.email = "Invalid email format";
//         if (!password || password.length < 6) newErrors.password = "Password must be at least 6 characters";
//         if (!mobile || mobile.length < 10) newErrors.mobile = "Mobile number must be 10 digits";
//         if (!role) newErrors.role = "Please select a role";
//         if (!location.trim()) newErrors.location = "Location is required";

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!validateForm()) return;
//         if (!otpVerified) {
//             alert('Please verify your mobile number first.');
//             return;
//         }

//         try {
//             await axios.post("http://localhost:3000/auth/register", formData);
//             alert('Registration successful. Please Login.');
//             navigate('/login');
//         } catch (error) {
//             const msg = error.response?.data?.message;
//             alert(msg === "User already exists please login" ? msg : "Registration failed");
//         }
//     };

//     return (
//         <div className='bg-gray-300 min-h-screen flex items-center justify-center'>
//             <form onSubmit={handleSubmit} className='border-2 border-black max-w-2xl w-full flex flex-col m-5 p-5 bg-white shadow-xl rounded-xl'>
//                 <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Register to AgriLink</h2>

//                 {/* Fields */}
//                 <label className='mt-2 font-semibold'>Name</label>
//                 <input name="name" value={formData.name} onChange={handleData} placeholder="Enter your name" className='border-2 border-black px-6 py-2 rounded-2xl' />
//                 {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}

//                 <label className='mt-4 font-semibold'>Email</label>
//                 <input name="email" value={formData.email} onChange={handleData} placeholder="Enter your email" className='border-2 border-black px-6 py-2 rounded-2xl' />
//                 {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}

//                 <label className='mt-4 font-semibold'>Password</label>
//                 <input type="password" name="password" value={formData.password} onChange={handleData} placeholder="Enter password" className='border-2 border-black px-6 py-2 rounded-2xl' />
//                 {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}

//                 <label className='mt-4 font-semibold'>Mobile</label>
//                 <input name="mobile" value={formData.mobile} onChange={handleData} placeholder="10-digit mobile" className='border-2 border-black px-6 py-2 rounded-2xl' />
//                 {errors.mobile && <p className="text-red-600 text-sm">{errors.mobile}</p>}

//                 {/* OTP Box */}
//                 {!otpVerified && showOtp && (
//                     <div className="mt-4">
//                         <div className="flex gap-2">
//                             <input
//                                 type="text"
//                                 value={otp}
//                                 onChange={(e) => setOtp(e.target.value)}
//                                 placeholder="Enter OTP"
//                                 className="border px-4 py-2 rounded-xl"
//                             />
//                             <button onClick={verifyOtp} type="button" className="bg-green-600 text-white px-4 py-2 rounded-xl">
//                                 Verify OTP
//                             </button>
//                         </div>
//                         <button
//                             onClick={sendOtp}
//                             type="button"
//                             className={`mt-2 text-sm text-blue-600 ${cooldown > 0 ? 'opacity-50 cursor-not-allowed' : 'underline'}`}
//                             disabled={cooldown > 0}
//                         >
//                             {cooldown > 0 ? `Resend OTP in ${cooldown}s` : "Resend OTP"}
//                         </button>
//                     </div>
//                 )}

//                 <label className='mt-4 font-semibold'>Role</label>
//                 <select name="role" value={formData.role} onChange={handleData} className='border-2 border-black px-6 py-2 rounded-2xl'>
//                     <option value="">Select Role</option>
//                     <option value="farmer">Farmer</option>
//                     <option value="buyer">Buyer</option>
//                 </select>
//                 {errors.role && <p className="text-red-600 text-sm">{errors.role}</p>}

//                 <label className='mt-4 font-semibold'>Location</label>
//                 <input name="location" value={formData.location} onChange={handleData} placeholder="Your location" className='border-2 border-black px-6 py-2 rounded-2xl' />
//                 {errors.location && <p className="text-red-600 text-sm">{errors.location}</p>}

//                 <input
//                     type="submit"
//                     value="Register"
//                     disabled={!otpVerified}
//                     className='bg-green-500 hover:bg-green-600 text-white font-semibold mt-6 px-6 py-2 rounded-2xl cursor-pointer disabled:opacity-50'
//                 />
//             </form>
//         </div>
//     );
// };

// export default Register;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "../firebase";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "", email: "", password: "", location: "",
//     mobile: "", role: "",
//   });
//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [confirmationResult, setConfirmationResult] = useState(null);
//   const [otpVerified, setOtpVerified] = useState(false);
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const handleInput = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.name.trim()) newErrors.name = "Name required";
//     if (!formData.email.includes("@")) newErrors.email = "Invalid email";
//     if (formData.password.length < 6) newErrors.password = "Minimum 6 chars";
//     if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = "Invalid mobile";
//     if (!formData.role) newErrors.role = "Select role";
//     if (!formData.location.trim()) newErrors.location = "Location required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const setupRecaptcha = () => {
//     window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
//       size: "invisible",
//       callback: () => sendOtp()
//     });
//   };

//   const sendOtp = async () => {
//     if (!/^\d{10}$/.test(formData.mobile)) {
//       alert("Enter valid 10-digit mobile number");
//       return;
//     }

//     setupRecaptcha();
//     const phone = "+91" + formData.mobile;
//     const appVerifier = window.recaptchaVerifier;

//     try {
//       const confirmation = await signInWithPhoneNumber(auth, phone, appVerifier);
//       setConfirmationResult(confirmation);
//       setOtpSent(true);
//       alert("OTP sent to " + formData.mobile);
//     } catch (error) {
//       alert("Failed to send OTP: " + error.message);
//     }
//   };

//   const verifyOtp = async () => {
//     if (!otp || otp.length !== 6) return alert("Enter valid 6-digit OTP");

//     try {
//       await confirmationResult.confirm(otp);
//       setOtpVerified(true);
//       alert("✅ OTP verified");
//     } catch (error) {
//       alert("❌ Invalid OTP");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;
//     if (!otpVerified) return alert("Please verify your mobile number first");

//     try {
//       await axios.post("http://localhost:3000/auth/register", formData);
//       alert("🎉 Registration successful. Please log in.");
//       navigate("/login");
//     } catch (err) {
//       alert(err.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-green-100 flex items-center justify-center">
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl w-full max-w-md shadow-md">
//         <h2 className="text-2xl font-bold mb-6 text-center text-green-700">Register</h2>

//         <label>Name</label>
//         <input name="name" value={formData.name} onChange={handleInput} className="input" />
//         {errors.name && <p className="text-red-500">{errors.name}</p>}

//         <label>Email</label>
//         <input name="email" value={formData.email} onChange={handleInput} className="input" />
//         {errors.email && <p className="text-red-500">{errors.email}</p>}

//         <label>Password</label>
//         <input name="password" type="password" value={formData.password} onChange={handleInput} className="input" />
//         {errors.password && <p className="text-red-500">{errors.password}</p>}

//         <label>Mobile Number</label>
//         <div className="flex gap-2">
//           <input name="mobile" value={formData.mobile} onChange={handleInput} className="input flex-1" />
//           {!otpSent && (
//             <button type="button" onClick={sendOtp} className="bg-blue-500 text-white px-3 py-1 rounded-lg">Send OTP</button>
//           )}
//         </div>
//         {errors.mobile && <p className="text-red-500">{errors.mobile}</p>}

//         {otpSent && !otpVerified && (
//           <>
//             <label>Enter OTP</label>
//             <div className="flex gap-2">
//               <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} className="input flex-1" />
//               <button type="button" onClick={verifyOtp} className="bg-green-600 text-white px-3 py-1 rounded-lg">Verify OTP</button>
//             </div>
//           </>
//         )}

//         <label>Role</label>
//         <select name="role" value={formData.role} onChange={handleInput} className="input">
//           <option value="">Select Role</option>
//           <option value="farmer">Farmer</option>
//           <option value="buyer">Buyer</option>
//         </select>
//         {errors.role && <p className="text-red-500">{errors.role}</p>}

//         <label>Location</label>
//         <input name="location" value={formData.location} onChange={handleInput} className="input" />
//         {errors.location && <p className="text-red-500">{errors.location}</p>}

//         <button type="submit" disabled={!otpVerified} className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg disabled:opacity-50">
//           Register
//         </button>

//         <div id="recaptcha-container"></div>
//       </form>
//     </div>
//   );
// };

// export default Register;
