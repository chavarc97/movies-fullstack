import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {signInStart, signInFailure, signInSuccess} from "../redux/user/userSlice";

const SignIn = () => {
  // 1. Create a state variable to store the form data
  const [formData, setFormData] = useState({});
  // 2 Create a state variable to store the error
  const { loading, error } = useSelector((state) => state.user);
  // 3. Create a navigate function and dispatch function
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // 4. Create a function to handle changes in the form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // 5. Create a function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    try {
      // 6. Make a POST request to the server
      const res = await fetch("/api/auth/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      // 7. Dispatch the signInSuccess action and navigate to the home page
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  };
  return (
    <main className="w-full h-screen flex items-start">
      <div className="  sm:relative w-1/2 h-full flex flex-col">
        <div className="absolute top-[25%] left-[10%]">
          <h1 className="text-[#E0E0E0] font-bold text-4xl">
            Your Perfect Movie Companion
          </h1>
          <p className="mt-3 text-lg text-white font font-normal">
            Start for free and get attractive offers from community
          </p>
        </div>
        <img
          src="/cover_foto.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className=" shadow-white shadow-xl drop-shadow-2xl w-1/2 h-full bg-[#E0E0E0] flex flex-col p-20 justify-between">
        <h1 className="text-2xl text-[060606] mt-10">
          Movie<span className="text-cyan-600 font-bold">Mate</span>
        </h1>

        <form onSubmit={handleSubmit} className=" flex flex-col mt-10 w-2/3 mx-auto">
          <h3 className="text-xl font-semibold mb-3 ">Sign in</h3>
          <p className="text-sm  mb-2">Welcome! Please enter your credential</p>
          <input
            onChange={handleChange}
            type="email"
            placeholder="email"
            id="email"
            className="mt-5 border-b border-neutral-400 bg-transparent focus:outline-none"
          />
          <input
            onChange={handleChange}
            type="password"
            placeholder="password"
            id="password"
            className="mt-5 border-b border-neutral-400 bg-transparent focus:outline-none"
          />
          <button disabled={loading} className="hover:shadow-lg mt-10 p-3 bg-neutral-800 text-white rounded">
          {loading ? "Loading..." : "Sign In"}
          </button>
          {error && <p className=" text-amber-700 mt-3 ">{error}</p>}
        </form>

        <div className="w-full flex flex-wrap gap-2 text-sm">
          <p>Don't have an account?</p>
          <Link className="text-cyan-600 font-semibold hover:text-cyan-500">
            Sign up here
          </Link>
        </div>
      </div>
    </main>
  )
}
export default SignIn