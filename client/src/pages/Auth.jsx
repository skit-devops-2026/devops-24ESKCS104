import React, { useState } from 'react'
import { BsRobot } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import axios from 'axios';
import { ServerUrl } from '../utils/serverUrl';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
function Auth({isModel = false}) {
    const dispatch = useDispatch()
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [authError, setAuthError] = useState('')

    const handleGoogleAuth = async () => {
        if (isSigningIn) return
        setIsSigningIn(true)
        setAuthError('')

        try {
            const response = await signInWithPopup(auth,provider)
            const name = response.user.displayName
            const email = response.user.email
            if (!name || !email) {
                throw new Error('Your Google account does not include a name and email address.')
            }
            const result = await axios.post(ServerUrl + "/api/auth/google" , {name , email} , {withCredentials:true})
            dispatch(setUserData(result.data))
        } catch (error) {
            console.error('Google sign-in failed:', error)
            const firebaseErrorMessages = {
                'auth/unauthorized-domain': 'This website domain is not authorized for Google sign-in. Add it to Firebase Authentication authorized domains.',
                'auth/popup-blocked': 'Your browser blocked the Google sign-in popup. Allow popups and try again.',
                'auth/popup-closed-by-user': 'The Google sign-in window was closed before sign-in finished.',
                'auth/operation-not-allowed': 'Google sign-in is not enabled for this Firebase project.',
                'auth/invalid-api-key': 'Firebase configuration is invalid. Check the client Firebase API key.',
            }
            setAuthError(
                error.response?.data?.message ||
                firebaseErrorMessages[error.code] ||
                error.message ||
                'Google sign-in failed. Please try again.'
            )
        } finally {
            setIsSigningIn(false)
        }
    }
  return (
    <div className={`
      w-full 
      ${isModel ? "py-4" : "min-h-screen bg-[#f3f3f3] flex items-center justify-center px-6 py-20"}
    `}>
        <motion.div 
        initial={{opacity:0 , y:-40}} 
        animate={{opacity:1 , y:0}} 
        transition={{duration:1.05}}
        className={`
        w-full 
        ${isModel ? "max-w-md p-8 rounded-3xl" : "max-w-lg p-12 rounded-[32px]"}
        bg-white shadow-2xl border border-gray-200
      `}>
            <div className='flex items-center justify-center gap-3 mb-6'>
                <div className='bg-black text-white p-2 rounded-lg'>
                    <BsRobot size={18}/>

                </div>
                <h2 className='font-semibold text-lg'>InterviewIQ.AI</h2>
            </div>

            <h1 className='text-2xl md:text-3xl font-semibold text-center leading-snug mb-4'>
                Continue with
                <span className='bg-green-100 text-green-600 px-3 py-1 rounded-full inline-flex items-center gap-2'>
                    <IoSparkles size={16}/>
                    AI Smart Interview

                </span>
            </h1>

            <p className='text-gray-500 text-center text-sm md:text-base leading-relaxed mb-8'>
                Sign in to start AI-powered mock interviews,
        track your progress, and unlock detailed performance insights.
            </p>


            <motion.button
            type="button"
            disabled={isSigningIn}
            aria-busy={isSigningIn}
            onClick={handleGoogleAuth}
            whileHover={{opacity:0.9 , scale:1.03}}
            whileTap={{opacity:1 , scale:0.98}}
            className='w-full flex items-center justify-center gap-3 py-3 bg-black text-white rounded-full shadow-md disabled:cursor-wait disabled:opacity-70'>
                <FcGoogle size={20}/>
                {isSigningIn ? 'Signing in...' : 'Continue with Google'}

            </motion.button>
            {authError && (
                <p role="alert" className="mt-4 text-center text-sm text-red-600">
                    {authError}
                </p>
            )}
        </motion.div>

      
    </div>
  )
}

export default Auth
