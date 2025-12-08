"use client";
import { useForm } from "@tanstack/react-form";
// import vector from "../../../public/12953560_Data_security_01.svg";
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
import GitHubSignUp from "./github";
import GoogleSignUp from "./google";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { Redo2 } from "lucide-react";
// import Image from "next/image";

const signInSchema = z.object({
  username: z
    .string()
    .min(8, { message: "Username must be atleast 8 characters long" })
    .max(20, { message: "Username must not be longer than 20 characters." })
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores.",
    ),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters long" })
    .max(20, { message: "Password must not be longer than 20 characters." }),
});

export default function SignIn() {
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },

    validators: {
      onSubmit: signInSchema,
    },

    onSubmit: async ({ value }) => {
      // toast("You submitted the following values:", {
      //   description: (
      //     <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
      //       <code>{JSON.stringify(value, null, 2)}</code>
      //     </pre>
      //   ),
      //   position: "top-right",
      //   classNames: {
      //     content: "flex flex-col gap-2",
      //   },
      //   style: {
      //     "--border-radius": "calc(var(--radius)  + 4px)",
      //   } as React.CSSProperties,
      // });

      await authClient.signIn.username(
        {
          username: value.username,
          password: value.password,
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

      redirect("/");
    },
  });
  return (
    <Card className="mx-auto mt-10 max-w-sm sm:max-w-xl md:max-w-2xl">
      <CardHeader className="mx-auto w-[90%] text-center">
        <CardTitle className="text-2xl font-bold tracking-wide text-blue-600">
          SignIn Page
        </CardTitle>
        <CardDescription>
          SignIn with social logins or credentials
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mx-auto flex min-w-[200px] flex-col gap-y-2 sm:flex-row sm:justify-evenly">
          <GitHubSignUp />
          <GoogleSignUp />
        </div>
        <form
          id="form-tanstack-input"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="username"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="form-tanstack-input-username">
                      Username
                    </FieldLabel>
                    <Input
                      className="w-[90%]"
                      id="form-tanstack-input-username"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="brucewayne_43"
                      //   autoComplete="username"
                    />
                    <FieldDescription></FieldDescription>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            {/* Password Input Field */}

            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="form-tanstack-input-password">
                      Password
                    </FieldLabel>
                    <Input
                      className="w-[90%]"
                      type="password"
                      id="form-tanstack-input-password"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="brucewaynerocks3000"
                      //   autoComplete="username"
                    />
                    <FieldDescription></FieldDescription>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field
          orientation="horizontal"
          className="mx-auto flex w-[250px] justify-center gap-1"
        >
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            <Redo2 />
          </Button>
          <Button type="submit" form="form-tanstack-input">
            Sign In
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
