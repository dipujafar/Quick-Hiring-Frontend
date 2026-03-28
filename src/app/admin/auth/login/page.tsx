
import { Metadata } from "next";
import LoginForm from "./_components/LoginForm";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Admin login for Quick Hire.",
};

const LoginPage = () => {
  return (
    <div className='min-h-screen lg:h-auto w-full bg-red-white flex flex-row items-center'>

      <div className="w-full">
        <div className="bg-white max-w-md border border-stroke rounded shadow p-8 mx-auto">
          <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>

    </div>
  );
};

export default LoginPage;