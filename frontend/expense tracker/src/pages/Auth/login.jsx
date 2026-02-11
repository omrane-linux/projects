import React from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apipaths'
import toast from 'react-hot-toast'

const Login = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const urlState = searchParams.get("state");
  const [state, setState] = React.useState(urlState || "login");
  const [loading, setLoading] = React.useState(false);

  // state for input value
  const [data, setData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  // handle change input value
  const onChangeHandler = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (state === "login") {
        // Login API Call
        const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
          email: data.email,
          password: data.password,
        });

        const { token } = response.data;

        if (token) {
          localStorage.setItem("token", token);
          toast.success("Login successful!");
          navigate("/dashboard");
        }
      } else {
        // Register API Call
        const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
          fullName: data.name,
          email: data.email,
          password: data.password,
        });

        const { token } = response.data;

        if (token) {
          localStorage.setItem("token", token);
          toast.success("Account created successfully!");
          navigate("/dashboard");
        }
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 relative">
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 sm:top-8 sm:left-8 flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors font-medium"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
        Back to Home
      </button>
      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-[350px] text-center border border-zinc-300/60 dark:border-zinc-700 rounded-2xl px-8 bg-white dark:bg-zinc-900"
      >
        <h1 className="text-zinc-900 dark:text-white text-3xl mt-10 font-medium">
          {state === "login" ? "Login" : "Register"}
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2 pb-6">
          Please {state === "login" ? "sign in" : "sign up"} to continue
        </p>

        {state !== "login" && (
          <div className="flex items-center w-full mt-4 bg-white dark:bg-zinc-800 border border-zinc-300/80 dark:border-zinc-700 h-12 rounded-full overflow-hidden pl-6 gap-2">
            {/* User Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500 dark:text-zinc-400" viewBox="0 0 24 24" >
              <path d="M20 21a8 8 0 0 0-16 0" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <input type="text" placeholder="Full Name" className="bg-transparent text-zinc-600 dark:text-zinc-200 placeholder-zinc-500 dark:placeholder-zinc-400 outline-none text-sm w-full h-full" name="name" value={data.name} onChange={onChangeHandler} required />
          </div>
        )}

        <div className="flex items-center w-full mt-4 bg-white dark:bg-zinc-800 border border-zinc-300/80 dark:border-zinc-700 h-12 rounded-full overflow-hidden pl-6 gap-2">
          {/* Mail Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500 dark:text-zinc-400" viewBox="0 0 24 24" >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <input type="email" placeholder="Email id" className="bg-transparent text-zinc-600 dark:text-zinc-200 placeholder-zinc-500 dark:placeholder-zinc-400 outline-none text-sm w-full h-full" name="email" value={data.email} onChange={onChangeHandler} required />
        </div>

        <div className="flex items-center mt-4 w-full bg-white dark:bg-zinc-800 border border-zinc-300/80 dark:border-zinc-700 h-12 rounded-full overflow-hidden pl-6 gap-2">
          {/* Lock Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500 dark:text-zinc-400" viewBox="0 0 24 24" >
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <input type="password" placeholder="Password" className="bg-transparent text-zinc-600 dark:text-zinc-200 placeholder-zinc-500 dark:placeholder-zinc-400 outline-none text-sm w-full h-full" name="password" value={data.password} onChange={onChangeHandler} required />
        </div>

        <div className="mt-5 text-left">
          <a className="text-sm text-indigo-500 dark:text-indigo-400 hover:underline" href="#" >
            Forgot password?
          </a>
        </div>

        <button type="submit" disabled={loading} className="mt-2 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 disabled:opacity-50 transition-opacity" >
          {loading ? "Loading..." : (state === "login" ? "Login" : "Create Account")}
        </button>

        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-3 mb-11">
          {state === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <button type="button" className="text-indigo-500 dark:text-indigo-400 hover:underline" onClick={() => setState((prev) => prev === "login" ? "register" : "login")} >
            {state === "login" ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </div>
  )
}

export default Login