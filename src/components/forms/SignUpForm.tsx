"use client";

import { useForm } from "@tanstack/react-form";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { InfoText } from "@/components/shared/InfoText";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/auth-client";
import { registerFormSchema, RegisterSchemaType } from "@/lib/schemas/auth.schema";

type ExtendedSignUpData = {
  name: string;
  email: string;
  password: string;
  phone: string;
};

export default function SignUpForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: { email: "", firstName: "", lastName: "", password: "", phone: "" } as RegisterSchemaType,
    validators: {
      onSubmit: registerFormSchema,
    },
    onSubmit: async ({ value }) => {
      setError(null);

      await signUp.email(
        {
          name: value.firstName + " " + value.lastName,
          email: value.email,
          password: value.password,
          phone: value.phone,
        } as ExtendedSignUpData,
        {
          onSuccess: () => {
            router.push("/sign-in");
            toast.success("Account created successfully!");
          },
          onError: ({ error }) => {
            setError(error.message);
          },
        }
      );
    },
  });

  return (
    <Card className="z-50 max-w-md rounded-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Sign Up</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Create an account to get started with our service. Please fill in the form below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={e => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="max-w-md rounded-md">
          <div className="grid grid-cols-2 gap-4">
            <form.Field name="firstName">
              {({ state, handleChange }) => (
                <div className="col-span-1">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input
                    placeholder="John"
                    value={state.value}
                    id="first-name"
                    className="mt-2"
                    onChange={e => handleChange(e.target.value)}
                  />
                  {state.meta.errors.length > 0 && state.meta.isTouched && (
                    <InfoText variant="error">{state.meta.errors[0]?.message}</InfoText>
                  )}
                </div>
              )}
            </form.Field>
            <form.Field name="lastName">
              {({ state, handleChange }) => (
                <div className="col-span-1">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input
                    placeholder="Doe"
                    value={state.value}
                    id="last-name"
                    className="mt-2"
                    onChange={e => handleChange(e.target.value)}
                  />
                  {state.meta.errors.length > 0 && state.meta.isTouched && (
                    <InfoText variant="error">{state.meta.errors[0]?.message}</InfoText>
                  )}
                </div>
              )}
            </form.Field>
          </div>
          <form.Field name="phone">
            {({ state, handleChange }) => (
              <div className="mt-4">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="1234567890"
                  value={state.value}
                  className="mt-2"
                  type="tel"
                  maxLength={15}
                  onChange={e => handleChange(e.target.value.replace(/\D/g, ""))}
                />
                {state.meta.errors.length > 0 && state.meta.isTouched && (
                  <InfoText variant="error">{state.meta.errors[0]?.message}</InfoText>
                )}
              </div>
            )}
          </form.Field>
          <form.Field name="email">
            {({ state, handleChange }) => (
              <div className="mt-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="m@example.com"
                  value={state.value}
                  className="mt-2"
                  onChange={e => handleChange(e.target.value)}
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
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="Your password"
                  type="password"
                  value={state.value}
                  className="mt-2"
                  onChange={e => handleChange(e.target.value)}
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
            Already have an account?
            <Link href="/sign-in" className="ml-1 text-emerald-700 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
