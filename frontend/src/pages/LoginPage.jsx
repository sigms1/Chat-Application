import React, { useState, useContext } from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const { login } = useContext(AuthContext); // ✅ Use the login function from context
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (currState === "Sign up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }

    // Prepare credentials to send
    const credentials =
      currState === "Sign up"
        ? { fullName, email, password, bio }
        : { email, password };

    try {
      // Use context login function
      await login(currState.toLowerCase().replace(" ", ""), credentials);

      // Redirect to home page after successful login/signup
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
      {/*left area*/}
      <img src={assets.logo_big} alt="" className="w-[min(30vw,250px)]" />

      {/*right area*/}
      <form
        onSubmit={onSubmitHandler}
        className="border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col rounded-lg shadow-lg gap-7"
      >
        <h2 className="font-medium text-2xl flex justify-between items-center">
          {currState}
          {isDataSubmitted && (
            <img
              onClick={() => setIsDataSubmitted(false)}
              src={assets.arrow_icon}
              alt=""
              className="w-5 cursor-pointer"
            />
          )}
        </h2>

        {currState === "Sign up" && !isDataSubmitted && (
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Full Name"
            required
          />
        )}

        {!isDataSubmitted && (
          <>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email Address"
              required
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </>
        )}

        {currState === "Sign up" && isDataSubmitted && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            rows={4}
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Provide a short bio..."
            required
          ></textarea>
        )}

        <button
          type="submit"
          className="py-3 bg-gradient-to-r from-purple-400 to violet-600 text-white rounded-md cursor-pointer"
        >
          {currState === "Sign up" ? "Create Account" : "Login Now"}
        </button>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy poilcy.</p>
        </div>

        <div className="flex flex-col gap-2">
          {currState === "Sign up" ? (
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => {
                  setCurrState("Login");
                  setIsDataSubmitted(false);
                }}
                className="font-medium text-violet-500 cursor-pointer"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Create an account{" "}
              <span
                onClick={() => {
                  setCurrState("Sign up");
                  setIsDataSubmitted(false);
                }}
                className="font-medium text-violet-500 cursor-pointer"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

// import React, { useState } from "react"; import assets from "../assets/assets"; import { useNavigate } from "react-router-dom"; const LoginPage = () => { const [currState, setCurrState] = useState("Sign up"); const [fullName, setFullName] = useState(""); const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [bio, setBio] = useState(""); const [isDataSubmitted, setIsDataSubmitted] = useState(false); const navigate = useNavigate(); const onSubmitHandler = async (event) => { event.preventDefault(); if (currState === "Sign up" && !isDataSubmitted) { setIsDataSubmitted(true); return; } try { const response = await axios.post( currState === "Sign up" ? "/api/signup" : "/api/login", { fullName, email, password, bio } ); if (response.data.success) { // Save user in context (authUser) setAuthUser(response.data.user); // Redirect to home page navigate("/"); } } catch (err) { console.log(err); } }; return ( <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl"> {/*left area*/} <img src={assets.logo_big} alt="" className="w-[min(30vw,250px)]" /> {/*right area*/} <form onSubmit={onSubmitHandler} className="border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col rounded-lg shadow-lg gap-7" > <h2 className="font-medium text-2xl flex justify-between items-center"> {currState} {isDataSubmitted && ( <img onClick={() => setIsDataSubmitted(false)} src={assets.arrow_icon} alt="" className="w-5 cursor-pointer" /> )} </h2> {currState === "Sign up" && !isDataSubmitted && ( <input onChange={(e) => setFullName(e.target.value)} value={fullName} type="text" className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Full Name" required /> )} {!isDataSubmitted && ( <> <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email Address" required className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" /> <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" required className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" /> </> )} {currState === "Sign up" && isDataSubmitted && ( <textarea onChange={(e) => setBio(e.target.value)} value={bio} rows={4} className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Provide a short bio..." required ></textarea> )} <button type="submit" className="py-3 bg-gradient-to-r from-purple-400 to violet-600 text-white rounded-md cursor-pointer" > {currState === "Sign up" ? "Create Account" : "Login Now"} </button> <div className="flex items-center gap-2 text-sm text-gray-500"> <input type="checkbox" /> <p>Agree to the terms of use & privacy poilcy.</p> </div> <div className="flex flex-col gap-2"> {currState === "Sign up" ? ( <p className="text-sm text-gray-600"> Already have an account?{" "} <span onClick={() => { setCurrState("Login"); setIsDataSubmitted(false); }} className="font-medium text-violet-500 cursor-pointer" > Login here </span> </p> ) : ( <p className="text-sm text-gray-600"> Create an account{" "} <span onClick={() => { setCurrState("Sign up"); setIsDataSubmitted(false); }} className="font-medium text-violet-500 cursor-pointer" > Click here </span> </p> )} </div> </form> </div> ); }; export default LoginPage;
