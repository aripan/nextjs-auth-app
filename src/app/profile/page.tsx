"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();
  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      const isUserLoggedOut = response.data.success;
      isUserLoggedOut && router.push("/login");
    } catch (error) {
      if (error instanceof Error) {
        // Handle the error
        return { error: error.message, status: 500 };
      } else {
        // Handle other cases where 'error' is not an instance of Error
        return { error: "An unknown error occurred", status: 500 };
      }
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1>ProfilePage</h1>
      <hr />
      <button
        onClick={logout}
        className=" bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
