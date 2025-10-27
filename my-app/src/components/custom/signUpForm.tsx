"use client";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
// import { redirect } from "next/navigation";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import Link from "next/link";
import GitHubSignUp from "./github";
import GoogleSignUp from "./google";
import { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { error } from "console";

const credentialSchema = z.object({
  username: z
    .string()
    .min(8, { message: "Username must be atleast 8 characters long" })
    .max(20, { message: "Username must not be longer than 20 characters." }),
  name: z.string().min(5).max(20),
  email: z.email(),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters long" })
    .max(20, { message: "Password must not be longer than 20 characters." }),
});

export default function SignUpForm() {
  const [username, setUsername] = useState("");
  const debounced = useDebounceCallback(setUsername, 2000);

  const form = useForm<z.infer<typeof credentialSchema>>({
    resolver: zodResolver(credentialSchema),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
    },
  });

  const { setError, clearErrors } = form;
  useEffect(() => {
    usernameExists();
  }, [username]);

  async function usernameExists() {
    const { data: response, error } = await authClient.isUsernameAvailable({
      username, // required
    });
    if (response?.available) {
      clearErrors("username");
      console.log(
        "Such username doesn't exist in database, you can use this username",
      );
    } else {
      console.log("Username is not available for you, as it is already taken");
      setError("username", {
        type: "manual",
        message: "Username is already taken, try another one",
      });
    }
  }

  async function onSubmit(values: z.infer<typeof credentialSchema>) {
    await authClient.signUp.email(
      {
        name: values.username,
        username: values.username,
        email: values.email,
        password: values.password,
        callbackURL: "/",
      },
      {
        onRequest: () => {
          toast("Requesting...", {
            description: "Wait a little",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          });
        },
        onSuccess: () => {
          toast("User registered, but unverifed", {
            description: "Have a good day.",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          });
        },
        onError: (ctx) => {
          console.log("error", ctx);
          toast("Something went wrong while signup...", {
            description: "Try again",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          });
        },
      },
    );
  }

  return (
    <>
      <Card className="mt-2h-[95%]">
        <CardHeader className="mx-auto w-md">
          <CardTitle className="text-center">Sign Up</CardTitle>
          <CardDescription className="text-center">
            Sign Up using credentials or socials.
          </CardDescription>
          <CardAction></CardAction>
        </CardHeader>
        <CardContent>
          <div className="mx-auto flex min-w-[200px] flex-row justify-evenly">
            <GitHubSignUp />
            <GoogleSignUp />
          </div>

          <hr className="blur-xs/50 mx-auto my-6 w-[90%] bg-neutral-300 shadow-[0_0_1px_1px_var(--color-neutral-300)]" />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        className="md:w-70"
                        placeholder="Bruce Wayne"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* username field */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        className={cn("md:w-70", "invalid:focus:ring-red-500")}
                        placeholder="brucewayne_25y"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          debounced(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="md:w-70"
                        placeholder="brucewayne@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Password field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        className="md:w-70"
                        placeholder="batmanrocks"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="mx-auto flex w-1/5 place-content-center"
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex place-content-center">
          <p>Already an existing user?</p>
          <Button className="-ml-3" variant={"link"}>
            <Link href={"/sign-in"}>Sign In</Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
