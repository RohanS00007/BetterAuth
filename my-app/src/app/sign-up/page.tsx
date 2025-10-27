import SignUpForm from "@/components/custom/signUpForm";
import { div } from "motion/react-client";

export default function SignUpPage() {
  return (
    <div className="mx-auto mt-2 h-screen w-md md:w-2xl md:max-w-2xl">
      <SignUpForm />
    </div>
  );
}
