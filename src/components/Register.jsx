import React, { useState } from 'react';
import BlurText from './BlurText';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/backgrounds/your-bg-image.png')" }}
    >
      <div className="w-full max-w-5xl h-[700px] flex rounded-xl overflow-hidden shadow-2xl bg-white/80 backdrop-blur-md">

        {/* Left side */}
        <div className="w-1/2 bg-[#f6f6f6] p-6 flex flex-col justify-center items-center text-gray-800 space-y-6">
          <img src="/logos/logo-fureal2-1.png" alt="Fureal Logo" className="w-40 h-auto" />

          <BlurText
            text="Where Blurred Line Between Reality And Digital"
            delay={150}
            animateBy="words"
            direction="top"
            className="text-lg font-AlegreySC text-center text-gray-800"
            repeatEvery={5000}
          />

          <div className="w-full max-w-lg h-[32rem]">
            <model-viewer
              src="/3DObj/victorian_sofa.glb"
              alt="3D Room"
              auto-rotate
              camera-controls
              ar
              shadow-intensity="1"
              exposure="1.0"
              environment-image="neutral"
              tone-mapping="neutral"
              camera-orbit="90deg 75deg 4m"
              style={{ width: '100%', height: '100%' }}
            ></model-viewer>
          </div>
        </div>

        {/* Right side - Register form */}
        <div className="w-1/2 p-10 flex flex-col justify-center bg-white/90 rounded-r-lg">
          <h3 className="text-2xl font-semibold text-gray-800">Create your account</h3>
          <p className="text-gray-600 mb-6">Join us to explore the digital world</p>

          <form className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                className="w-full border border-gray-400 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4b28b]"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Date of Birth</label>
              <input
                type="date"
                className="w-full border border-gray-400 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4b28b]"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  className="w-full border border-gray-400 px-4 py-2 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-[#d4b28b]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-2 flex items-center text-xl text-gray-500 hover:text-[#b89064]"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm password"
                  className="w-full border border-gray-400 px-4 py-2 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-[#d4b28b]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-2 flex items-center text-xl text-gray-500 hover:text-[#b89064]"
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full border-2 bg-[#c4a27d] text-white py-2 rounded-md hover:bg-[#b89064] hover:text-black transition"
            >
              Register
            </button>

            {/* Divider with "or" */}
            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-sm text-gray-500">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Google Register Button */}
            <button
              type="button"
              className="w-full flex items-center justify-center border border-gray-400 rounded-md py-2 hover:bg-gray-100 transition"
            >
              <img
                src="/image/google_icon.png"
                alt="Google Logo"
                className="w-7 h-7 mr-2"
              />
              <span className="text-sm text-gray-700">Sign up with Google</span>
            </button>
          </form>

          <p className="mt-8 text-sm text-center text-gray-700">
            Already have an account?{" "}
            <a href="/login" className="text-[#b89064] hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
