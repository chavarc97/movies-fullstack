import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  // 1. Create a state variable to store the form data
  const [formData, setFormData] = useState({});
  console.log(formData);
  // 2. Create a state variable to store the error message
  const [error, setError] = useState(null);
  // 3. Create a state variable to store the loading state
  const [loading, setLoading] = useState(false);
  // 4. Create a navigate function
  const navigate = useNavigate();

  // 5. Create a function to handle changes in the form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // 6. Create a function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 7. Make a POST request to the server
      const res = await fetch("/api/auth/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
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

        <form
          onSubmit={handleSubmit}
          className=" flex flex-col mt-10 w-2/3 mx-auto"
        >
          <h3 className="text-xl font-semibold mb-3 ">Sign up</h3>
          <p className="text-sm  mb-2">Welcome! Please enter your credential</p>

          <input
            onChange={handleChange}
            type="text"
            placeholder="username"
            id="username"
            className="mt-5 border-b border-neutral-400 bg-transparent focus:outline-none"
          />
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
          <button disabled={loading} className="mt-10 p-3 bg-neutral-800 text-white rounded">
            {loading ? "Loading..." : "Sign Up"}
          </button>
          {error && <p className=" text-red-500 mt-3">{error}</p>}
        </form>

        <div className="w-full flex flex-wrap gap-2 text-sm">
          <p>Already have an account?</p>
          <Link className="text-cyan-600 font-semibold underline-offset-2">
            Sign in here
          </Link>
        </div>
      </div>
    </main>
  );
};
export default SignUp;
