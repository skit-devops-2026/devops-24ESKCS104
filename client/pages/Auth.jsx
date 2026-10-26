import { useDispatch } from 'react-redux'
import { setUserData } from '../../redux/userSlice.js'
import { signInWithPopup } from "firebase/auth";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoSparkles } from "react-icons/io5";
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../../utils/firebase";
import axios from "axios";
import { ServerUrl } from '../../App';


function Auth({isModel =false}) {
  const dispatch = useDispatch()
  const handleGoogleAuth = async ()=>{
    try {
      const response = await signInWithPopup(auth,provider)
      let User = response.user
      let name = User.displayName
      let email = User.email
      const result = await axios.post(ServerUrl + "/api/auth/google" , {name ,email},{withCredentials:true})
      dispatch(setUserData(result.data)) 

    } catch (error) {
      console.log(error)
      dispatch(setUserData(null))
    }
  }
  return (
    <div className={`w-full ${isModel ? "py-4" : "min-h-screen flex items-center justify-center px-6 py-20 bg-[#f3f3f3]"}`}>
      <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.25 }}
      className={`w-full ${isModel ? "max-w-md p-8 rounded-3xl" : "max-w-lg p-12 rounded-3xl bg-white shadow-2xl border border-gray-200"}`}>
        <div className=" flex  items-center justify-center mb-6 gap-3"> 
          <div className='bg-black text-white p-2 rounded-3xl'><GiArtificialIntelligence size={20} /></div>
          <h2 className="text-lg font-semibold ">InterViewX</h2>

        </div>
        <h1 className="text-2xl  md:text-3xl  font-semibold text-center leading-snug mb-4">Continue with{" "} <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full inline-flex items-center">AI Interview Platform</span></h1>

        <p className="text-gray-500 text-center  text-sm md:text-base  leading-relaxed mb-8">Sign in to start AI-powered mock interviews, track your progress, and unlock detailed performance insights.</p>

        <motion.button 
        onClick={handleGoogleAuth}
        whileHover={{ opacity: 0.9, scale: 1.05 }} whileTap={{ opacity: 0.95, scale: 0.95 }} className="w-full flex items-center justify-center gap-3 bg-black text-white py-3 shadow-md rounded-full font-medium">
          <FcGoogle size={20} /> Continue with Google
        </motion.button>




      </motion.div>
    </div>
  )
}

export default Auth
