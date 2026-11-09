import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { UserRole } from "@/common/types";
import { Button } from "@/common/components/ui/Button";
import { Select } from "@/common/components/ui/Select";
import { TextField } from "@/common/components/ui/TextField";
import { ROUTES } from "@/common/constants/routes";
import { AuthLayout } from "@/auth/components/AuthLayout";
import { ROLE_HOME, ROLE_OPTIONS } from "@/auth/data/roles";

export function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>("brand");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Partial<Record<"email" | "password", string>>>({});

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const next: typeof errors = {};
    if (!email.includes("@")) next.email = "Enter the email you signed up with.";
    if (!password) next.password = "Enter your password.";
    setErrors(next);
    if (Object.keys(next).length === 0) navigate(ROLE_HOME[role]);
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to pick up where your projects left off."
      footer={
        <>
          New to Floooww?{" "}
          <Link
            to={ROUTES.signup}
            className="font-inter-medium font-medium text-link hover:underline"
          >
            Sign up free
          </Link>
        </>
      }
    >
      <form noValidate onSubmit={onSubmit} className="flex flex-col gap-4">
        <Select label="Workspace" options={ROLE_OPTIONS} value={role} onChange={setRole} />
        <TextField
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@company.com"
          error={errors.email}
        />
        <TextField
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={errors.password}
        />
        <Button
          type="submit"
          fullWidth
          className="mt-2"
          trailingIcon={<ArrowRight size={16} strokeWidth={2} />}
        >
          Log in
        </Button>
      </form>
    </AuthLayout>
  );
}
