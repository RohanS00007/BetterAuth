"use client";

import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import Link from "next/link";
import GitHubSignUp from "./github";
import GoogleSignUp from "./google";
import { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
// import { redirect } from "next/dist/server/api-utils";
// import { cn } from "@/lib/utils";

// import { Redirect } from "next";
import { redirect } from "next/navigation";
import { Redo, Undo2 } from "lucide-react";

const credentialSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be atleast 3 characters long")
    .max(20, "Name must not be longer than 20 characters."),

  username: z
    .string()
    .min(8, { message: "Username must be atleast 8 characters long" })
    .max(20, { message: "Username must not be longer than 20 characters." })
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores.",
    ),

  email: z.email(),

  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters long" })
    .max(20, { message: "Password must not be longer than 20 characters." }),
});

export default function SignUp() {
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
    if (username.trim() === "") return;
    usernameExists();
  }, [username]);

  async function usernameExists() {
    const { data: response, error } = await authClient.isUsernameAvailable({
      username, // required
    });

    if (response?.available) {
      clearErrors("username");
    } else {
      // console.log("Username is not available for you, as it is already taken");
      setError("username", {
        type: "onBlur",
        message: error?.message || "Username already taken",
      });
    }
  }

  async function onSubmit(data: z.infer<typeof credentialSchema>) {
    await authClient.signUp.email(
      {
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
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
          setInterval(() => {
            redirect("/");
          }, 2000);
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

    // toast("You submitted the following values:", {
    //   description: (
    //     <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
    //       <code>{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    //   position: "bottom-right",
    //   classNames: {
    //     content: "flex flex-col gap-2",
    //   },
    //   style: {
    //     "--border-radius": "calc(var(--radius)  + 4px)",
    //   } as React.CSSProperties,
    // });
  }

  return (
    <Card className="mx-auto mt-4 w-[400px] sm:h-auto sm:min-w-md md:min-w-3xl">
      <CardHeader className="mx-auto w-[90%] text-center">
        <CardTitle className="text-2xl font-bold text-blue-700 backdrop-blur-2xl">
          Sign Up Page
        </CardTitle>
        <CardDescription>
          Sign Up using social logins or credentials...
        </CardDescription>
      </CardHeader>

      <div className="mx-auto flex w-xs max-w-[500px] flex-col justify-evenly sm:w-md md:flex-row">
        <GoogleSignUp />
        <GitHubSignUp />
      </div>

      <CardContent>
        <form id="form-rhf-input" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2">
            {/* Full Name Input */}
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-input-name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-input-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Bruce Wayne"
                    // autoComplete="username"
                  />
                  <FieldDescription></FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* UserName Input Field */}

            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-input-username">
                    Username
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-input-username"
                    aria-invalid={fieldState.invalid}
                    placeholder="brucewayne_07"
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      debounced(e.target.value);
                    }}
                    // autoComplete="username"
                  />
                  <FieldDescription></FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* Email Input Field */}

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-input-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-input-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="brucewayne@gmail.com"
                    type="email"
                    // autoComplete="username"
                  />
                  <FieldDescription></FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* Password Input Field */}

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-input-password">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    id="form-rhf-input-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="brucewaynerocks"
                    // autoComplete="username"
                  />
                  <FieldDescription></FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Field
          orientation="horizontal"
          className="mx-auto flex w-[60%] place-content-center place-items-center justify-center gap-1"
        >
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            <Undo2 />
          </Button>
          <Button type="submit" form="form-rhf-input">
            Submit
          </Button>
        </Field>
        <div className="mt-3 flex place-content-center place-items-center">
          <p className="text-sm text-neutral-400">Already an existing user?</p>
          <Button className="-ml-3" variant={"link"}>
            <Link href={"/sign-in"}>Sign In</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
