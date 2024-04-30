import { Link } from "react-router-dom";

const SignIn = () => {
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

        <form className=" flex flex-col mt-10 w-2/3 mx-auto">
          <h3 className="text-xl font-semibold mb-3 ">Sign in</h3>
          <p className="text-sm  mb-2">Welcome! Please enter your credential</p>

          <input
            type="text"
            placeholder="username"
            id="username"
            className="mt-5 border-b border-neutral-400 bg-transparent focus:outline-none"
          />
          <input
            type="email"
            placeholder="email"
            id="email"
            className="mt-5 border-b border-neutral-400 bg-transparent focus:outline-none"
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            className="mt-5 border-b border-neutral-400 bg-transparent focus:outline-none"
          />
          <button className="hover:shadow-lg mt-10 p-3 bg-neutral-800 text-white rounded">
            Sign In
          </button>
        </form>

        <div className="w-full flex flex-wrap gap-2 text-sm">
          <p>Already have an account?</p>
          <Link className="text-cyan-600 font-semibold hover:text-cyan-500">
            Sign in here
          </Link>
        </div>
      </div>
    </main>
  )
}
export default SignIn