"use client";
import * as z from "zod";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import GitHubSignUp from "./github";
import GoogleSignUp from "./google";

const signInSchema = z.object({
  username: z
    .string()
    .min(8, { message: "Username must be atleast 8 characters long" })
    .max(20, { message: "Username must not be longer than 20 characters." }),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters long" })
    .max(20, { message: "Password must not be longer than 20 characters." }),
});

export default function SignInForm() {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    await authClient.signIn.username(
      {
        username: values.username,
        password: values.password,
      },
      {
        onRequest: () => {
          toast("Requesting", {
            description: "Please wait",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          });
        },
        onSuccess: () => {
          toast("User Logged in", {
            description: "Enjoy the websurfing",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          });
        },
        onError: (ctx) => {
          // Handle the error
          if (ctx.error.status === 403) {
            alert("Invalid credentials, try again");
          }
          //you can also show the original error message
          alert(ctx.error.message);
        },
      },
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>SignIn using credentials</CardDescription>
          <CardAction></CardAction>
        </CardHeader>
        <CardContent>
          <div className="mx-auto flex min-w-[200px] flex-row justify-evenly">
            <GitHubSignUp />
            <GoogleSignUp />
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Username Field */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="brucewayne_123" {...field} />
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
                        placeholder="password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </>
  );
}
