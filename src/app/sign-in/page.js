"use client";

import { Label } from "@/components/ui/label";
import { initialLoginFormData, userLoginFormControls } from "../utils";
import CommonFormElement from "@/components/form-element/page";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { loginUserAction } from "@/actions";
import { useRouter } from "next/navigation";

function SignIn() {
  const [signInFormData, setSignInFormData] = useState(initialLoginFormData);
  const router = useRouter();

  async function handleSignIn(event) {
    event.preventDefault(); // Prevent the default form submission
    const result = await loginUserAction(signInFormData);
    console.log(result);
    if (result?.success) router.push("/"); // Redirect on successful login
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h1>
        <form onSubmit={handleSignIn} className="space-y-4">
          {userLoginFormControls.map((controlItem) => (
            <div key={controlItem.name}>
              <Label className="block text-gray-600 mb-1">
                {controlItem.label}
              </Label>
              <CommonFormElement
                currentItem={controlItem}
                value={signInFormData[controlItem.name]} // Use state value instead of set function
                onChange={(event) =>
                  setSignInFormData({
                    ...signInFormData,
                    [event.target.name]: event.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
          <Button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            Sign In
          </Button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">Don't have an account?</p>
          <Button
            onClick={() => router.push("/sign-up")}
            className="w-full mt-2 py-2 bg-red-500 text-white rounded-md hover:bg-gray-400 transition duration-200"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
