"use client";

import { useForm } from "@tanstack/react-form";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { InfoText } from "@/components/shared/InfoText";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth-client";
import { loginFormSchema, LoginSchemaType } from "@/lib/schemas/auth.schema";

export const SignInForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    } as LoginSchemaType,
    validators: {
      onSubmit: loginFormSchema,
    },
    onSubmit: async ({ value }) => {
      setError(null);
      await signIn.email(
        { email: value.email, password: value.password },
        {
          onSuccess: () => {
            router.push("/");
            router.refresh();
          },
          onError: ({ error }) => {
            setError(error.message);
          },
        }
      );
    },
  });

  return (
    <Card className="z-50 w-[300px] rounded-md md:w-[350px]">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Sign in to your account to access all features. Please enter your credentials below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={e => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}>
          <form.Field name="email">
            {({ state, handleChange }) => (
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  className="mt-2"
                  id="email"
                  placeholder="m@example.com"
                  onChange={e => handleChange(e.target.value)}
                  value={state.value}
                />
                {state.meta.errors.length > 0 && state.meta.isTouched && (
                  <InfoText variant="error">{state.meta.errors[0]?.message}</InfoText>
                )}
              </div>
            )}
          </form.Field>
          <form.Field name="password">
            {({ state, handleChange }) => (
              <div className="mt-4">
                <Label htmlFor="email">Password</Label>
                <Input
                  className="mt-2"
                  id="email"
                  placeholder="********"
                  type="password"
                  onChange={e => handleChange(e.target.value)}
                  value={state.value}
                />
                {state.meta.errors.length > 0 && state.meta.isTouched && (
                  <InfoText variant="error">{state.meta.errors[0]?.message}</InfoText>
                )}
              </div>
            )}
          </form.Field>
          <form.Subscribe
            selector={state => [state.isSubmitting]}
            // eslint-disable-next-line react/no-children-prop
            children={([isSubmitting]) => (
              <Button disabled={isSubmitting} className="mt-4 w-full">
                {isSubmitting ? <Loader className="animate-spin" /> : "Sign In"}
              </Button>
            )}
          />
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        {error && <p className="mb-2 text-sm text-red-500">{error}</p>}
        <div>
          <p className="text-sm text-gray-500">
            Don&apos;t have an account?
            <Link href="/sign-up" className="ml-1 text-emerald-700 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};
