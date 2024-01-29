"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import { signIn, useSession } from "next-auth/react";

const Login = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const emailRef = useRef<HTMLInputElement>(null);
  const pswrdRef = useRef<HTMLInputElement>(null);

  const [errorMsg, setErrorMsg] = useState("");
  const [loginText, setLoginText] = useState("Sign In");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = pswrdRef.current?.value;

    setLoginText("Authenticating...");

    if (!email || !password) {
      setLoginText("Authenticating...");
      setErrorMsg("Please enter both email and password.");
      return;
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setLoginText("Authenticating...");
      setErrorMsg(`Login failed: ${result.error}`);
      setLoginText("Sign In");
    } else {
      router.push("/");
    }
  };

  if (session) {
    router.replace("/");
  }
  return (
    <div className="flex-1">
      <div className="flex flex-col justify-center">
        <div>
          {errorMsg && (
            <div
              className="px-4 py-2 mt-8 text-red-500 bg-red-200 rounded shadow-lg shadow-red-500/50"
              role="alert"
            >
              {errorMsg}
            </div>
          )}
          <div className="flex justify-center mt-3 text-white dark:text-gray-300">
            Sign in to access your account
          </div>
        </div>
      </div>

      <div className="mt-8">
        <form
          className="space-y-4 md:space-y-6"
          role="form"
          onSubmit={handleLogin}
        >
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm text-white dark:text-gray-200"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="me@email.com"
              ref={emailRef}
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mt-6">
            <div className="flex justify-between mb-2">
              <label
                htmlFor="password"
                className="text-sm text-white dark:text-gray-200"
              >
                Password
              </label>
            </div>

            <input
              type="password"
              name="password"
              id="password"
              placeholder="********"
              ref={pswrdRef}
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="my-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            >
              {loginText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
