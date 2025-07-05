import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons'

const Login = () => {

  const [currentState, setCurrentState] = useState('Sign Up');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  }

  return (
    <div className="border-t pt-7 mt-[81px]">
      <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto gap-4 text-gray-800'>
        <div className='inline-flex items-center gap-2 mb-2 mt-10'>
          <p className='prata-regular text-3xl italiana-regular'>{currentState}</p>
          <hr className='border-none h-[1.5px] w-8 text-gray-800' />
        </div>

        {currentState === 'Login' ? '' : <input type="text" className='w-full px-3 py-2 border border-gray-600 rounded-md instrument-sans-regular' placeholder='Name' required />}

        <input type="email" className='w-full px-3 py-2 border border-gray-600 rounded-md instrument-sans-regular' placeholder='Email' required />

        <input type="password" className='w-full px-3 py-2 border border-gray-600 rounded-md instrument-sans-regular' placeholder='Password' required />

        {currentState === 'Sign Up' ? '' : <p className="text-gray-700">-Or-</p> }

        <input type="number" className='w-full px-3 py-2 border border-gray-600 rounded-md instrument-sans-regular' placeholder='Phone Number' required />

        {currentState === 'Sign Up' ? '' : <p className="text-gray-700 instrument-sans-regular">-Or-</p> }

        {currentState === 'Login' ? '' : <p className="text-gray-700 instrument-sans-regular">-Or-</p> }

      <div className="flex space-x-4">
        {/* Facebook Button */}
        <a
          href="#"
          className="flex items-center border border-gray-500 rounded-md px-4 py-2 text-sm text-black bg-white hover:border-black hover:bg-gray-100 instrument-sans-regular"
        >
          <span className="flex items-center justify-center bg-white text-white rounded-md w-6 h-6 mr-3">
            <FontAwesomeIcon icon={faFacebookF} className='cursor-pointer text-sky-600 text-xl' />
          </span>
          Facebook
        </a>

        {/* Google Button */}
        <a
          href="#"
          className="flex items-center border border-gray-500 rounded-md px-4 py-2 text-sm text-black bg-white hover:border-black hover:bg-gray-100 instrument-sans-regular"
        >
          <span className="flex items-center justify-center text-white bg-white rounded-md w-6 h-6 mr-3">
            <FontAwesomeIcon icon={faGoogle} className='cursor-pointer text-green-500 text-xl' />
          </span>
          Google
        </a>
      </div>

        <div className='w-full flex justify-between text-sm mt-[-8px'>
          <p className='cursor-pointer font-bold text-gray-500 instrument-sans-regular'>Forgot your password</p>
          {
            currentState === 'Login'
            ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer font-bold text-[
#FF7272] instrument-sans-regular'>Create Account</p>
            : <p onClick={() => setCurrentState('Login')} className='cursor-pointer text-[--peach] font-bold instrument-sans-regular'>Login Here</p>
          }
        </div>
        <button className='bg-[--peach] text-white font-light px-8 py-2 mt-4 rounded-md instrument-sans-regular'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
      </form>
    </div>
  )
}

export default Login