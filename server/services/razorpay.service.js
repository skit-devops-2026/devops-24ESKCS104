import dotenv from "dotenv"
dotenv.config()
import Razorpay from "razorpay"

const getRazorpay = () => {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    const error = new Error("Razorpay credentials are not configured");
    error.statusCode = 503;
    throw error;
  }

  return new Razorpay({ key_id, key_secret });
};

export default getRazorpay;