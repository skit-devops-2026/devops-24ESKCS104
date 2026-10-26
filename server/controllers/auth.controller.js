import genToken from "../config/token.js"
import User from "../models/user.model.js"
import mongoose from "mongoose"

const getAuthCookieOptions = (req, includeMaxAge = true) => {
    const isSecureContext = process.env.NODE_ENV === "production" ||
        req.get("x-forwarded-proto") === "https"
    return {
        httpOnly: true,
        secure: isSecureContext,
        sameSite: isSecureContext ? "none" : "lax",
        ...(includeMaxAge ? { maxAge: 7 * 24 * 60 * 60 * 1000 } : {})
    }
}

export const googleAuth = async (req,res) => {
    try {
        const {name , email} = req.body
        if (typeof name !== "string" || !name.trim() || typeof email !== "string" || !email.trim()) {
            return res.status(400).json({message:"A Google account name and email are required"})
        }
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).json({message:"The account database is unavailable. Check the server MongoDB connection."})
        }

        const normalizedEmail = email.trim().toLowerCase()
        let user = await User.findOne({email: normalizedEmail})
        if(!user){
            user = await User.create({
                name: name.trim(),
                email: normalizedEmail
            })
        }
        let token = await genToken(user._id)
        res.cookie("token" , token , getAuthCookieOptions(req))

        return res.status(200).json(user)



    } catch (error) {
        console.error("Google authentication failed:", error)
        return res.status(500).json({message:"Google authentication failed while accessing the account database"})
    }
    
}

export const logOut = async (req,res) => {
    try {
        res.clearCookie("token", getAuthCookieOptions(req, false))
        return res.status(200).json({message:"LogOut Successfully"})
    } catch (error) {
         console.error("Logout failed:", error)
         return res.status(500).json({message:"Logout failed"})
    }
    
}
