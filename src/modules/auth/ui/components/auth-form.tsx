"use client";
import { FaGoogle, FaApple } from "react-icons/fa";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";

import { Button } from "@/components/ui/button";

export const AuthForm = () => {
  return (
    <div>
      <SignIn.Root>
        <SignIn.Step name="start">
          <h1 className="text-foreground text-2xl font-medium">Get started</h1>
          <p className="text-muted-foreground text-sm">
            Log in to start tracking your workshop expenses
          </p>
          <div className="flex flex-col gap-4 py-4">
            <Clerk.Connection asChild name="google">
              <Button className="relative w-full hover:cursor-pointer">
                <FaGoogle className="absolute top-2.5 left-4 size-4" />
                Continue with Google
              </Button>
            </Clerk.Connection>
            <Clerk.Connection asChild name="apple">
              <Button className="relative w-full hover:cursor-pointer">
                <FaApple className="absolute top-2.5 left-4 size-4" />
                Continue with Apple
              </Button>
            </Clerk.Connection>
          </div>
          <p className="text-foreground text-sm">
            By continuing, you agree to the{" "}
            <a href="#" className="hover:underline">
              Terms of Service.
            </a>
          </p>
        </SignIn.Step>
      </SignIn.Root>
      <div id="clerk-captcha"></div>
    </div>
  );
};
