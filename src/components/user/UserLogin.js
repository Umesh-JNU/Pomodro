import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPwd, signInWithGoogle } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../loader/Loading";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading, navigate]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full md:w-[70%] m-auto bg-gradient-to-b from-[#1e40af] via-[#1e3a8a] to-[#312e81] p-6 rounded-md">
          <h2>Go to dashboard.</h2>
          <div className="mt-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-textSecondary"
            >
              Email *
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <input
                type="email"
                value={email}
                name="email"
                placeholder="abc@gmail.com"
                required=""
                className="block w-full py-2 px-3 rounded-md ring-offset-0 ring-2 ring-transparent focus:ring-[#2563eb] focus:outline-none text-textInput sm:text-sm"
                aria-label="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-textSecondary"
            >
              Password *
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <input
                type="password"
                value={password}
                name="password"
                required=""
                className="block w-full py-2 px-3 rounded-md ring-offset-0 ring-2 ring-transparent focus:ring-[#2563eb] focus:outline-none text-textInput sm:text-sm"
                aria-label="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-10 flex justify-between text-sm lg:text-lg">
            <button
              className="py-1 px-4 md:py-2 border rounded-md border-textSecondary text-textSecondary hover:text-hover hover:bg-textSecondary transition-all"
              onClick={() => signInWithEmailAndPwd(email, password)}
            >
              Login
            </button>
            <button
              className="py-1 px-4 md:py-2 border rounded-md border-textSecondary text-textSecondary hover:text-hover hover:bg-textSecondary transition-all"
              onClick={signInWithGoogle}
            >
              Login with Google
            </button>
          </div>
          <div className="mt-8 text-textSecondary">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-textPrimary font-medium transition-all hover:text-hover"
            >
              Register
            </Link>{" "}
            now.
          </div>
        </div>
      )}
    </>
  );
}
export default UserLogin;
