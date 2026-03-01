import GoogleSignin from "@/components/GoogleSignin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signInWithMagicLink } from "@/lib/auth-actions";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center ">
      <div className="w-full max-w-md bg-secondary rounded-xl shadow-lg p-8 flex flex-col gap-6">
        <div className="mb-4 text-center">
          <h1 className="text-2xl font-bold  mb-2">Sign Up</h1>
          <p className=" text-sm">Please sign up to create an account.</p>
        </div>
        <form action={signInWithMagicLink} className="flex flex-col gap-4">
          <label htmlFor="email-magic" className="text-sm font-medium ">
            Email Address
          </label>
          <Input
            type="email"
            id="email-magic"
            name="email-magic"
            required
            placeholder="you@example.com"
            className="mb-2 bg-background"
          />
          <Button type="submit" className="w-full">
            Sign up with Email
          </Button>
        </form>
        <div className="flex items-center my-4">
          <div className="grow h-px bg-gray-200" />
          <span className="mx-2 text-gray-400 text-xs">OR</span>
          <div className="grow h-px bg-gray-200" />
        </div>
        <GoogleSignin />
        <div className="mt-6 text-center text-sm ">
          Already have an account?{" "}
          <a
            href="/account/signin"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}
