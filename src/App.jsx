import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(6);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);

  const generatePassword = () => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let chars = '';
    if (includeUppercase) chars += uppercaseChars;
    if (includeLowercase) chars += lowercaseChars;
    if (includeNumbers) chars += numberChars;
    if (includeSpecialChars) chars += specialChars;

    if (chars === '') {
      toast.error('Please select at least one character type.');
      return;
    }

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      generatedPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setPassword(generatedPassword);
    toast.success('Password generated successfully!');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      toast.info('Password copied to clipboard!');
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-indigo-600">Password Generator</h1>
        <div className="mb-4 sm:mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">Password Length</label>
          <input
            type="range"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
            min="4"
            max="20"
          />
          <span className="block text-center mt-2 text-indigo-600 font-medium">{length}</span>
        </div>
        <div className="mb-4 sm:mb-6 space-y-2 sm:space-y-3">
          {[
            { state: includeUppercase, setter: setIncludeUppercase, label: "Include Uppercase" },
            { state: includeLowercase, setter: setIncludeLowercase, label: "Include Lowercase" },
            { state: includeNumbers, setter: setIncludeNumbers, label: "Include Numbers" },
            { state: includeSpecialChars, setter: setIncludeSpecialChars, label: "Include Special Characters" },
          ].map(({ state, setter, label }) => (
            <label key={label} className="flex items-center">
              <input
                type="checkbox"
                checked={state}
                onChange={() => setter(!state)}
                className="form-checkbox h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 transition duration-150 ease-in-out"
              />
              <span className="ml-2 text-xs sm:text-sm text-gray-700">{label}</span>
            </label>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={generatePassword}
          className="w-full bg-indigo-600 text-white py-2 sm:py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 text-base sm:text-lg font-medium"
        >
          Generate Password
        </motion.button>
        {password && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 sm:mt-6"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-100 p-3 rounded-lg">
              <span className="text-sm sm:text-base md:text-lg font-medium text-gray-800 mb-2 sm:mb-0 break-all">{password}</span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={copyToClipboard}
                className="text-indigo-600 hover:text-indigo-800 font-medium text-sm sm:text-base"
              >
                Copy
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;