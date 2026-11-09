import { useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import type { UserRole } from "@/common/types";
import { Button } from "@/common/components/ui/Button";
import { Select } from "@/common/components/ui/Select";
import { TextField } from "@/common/components/ui/TextField";
import { ROUTES } from "@/common/constants/routes";
import { AuthLayout } from "@/auth/components/AuthLayout";
import { ROLE_HOME, ROLE_OPTIONS, parseRole } from "@/auth/data/roles";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SignupPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const query = params.get("q")?.trim();
  const [role, setRole] = useState<UserRole | null>(parseRole(params.get("role")));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<
    Partial<Record<"name" | "email" | "password" | "role", string>>
  >({});

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const next: typeof errors = {};
    if (!name.trim()) next.name = "Enter your full name.";
    if (!EMAIL_PATTERN.test(email)) next.email = "Enter a valid work email.";
    if (password.length < 8) next.password = "Use at least 8 characters.";
    if (!role) next.role = "Choose how you’ll use Floooww.";
    setErrors(next);
    if (Object.keys(next).length === 0 && role) navigate(ROLE_HOME[role]);
  };

  return (
    <AuthLayout
      title="Create your free account"
      subtitle="No credit card required. Creator access is always free."
      footer={
        <>
          Already have an account?{" "}
          <Link
            to={ROUTES.login}
            className="font-inter-medium font-medium text-link hover:underline"
          >
            Log in
          </Link>
        </>
      }
    >
      {query && (
        <div className="mb-5 flex items-start gap-2.5 rounded-md bg-primary-subtle px-3 py-2.5 text-[13px] leading-5 text-body">
          <Search
            size={16}
            strokeWidth={2}
            className="mt-0.5 shrink-0 text-primary"
            aria-hidden="true"
          />
          <p>
            Sign up to see creators for{" "}
            <span className="font-inter-semibold font-semibold text-ink">“{query}”</span>.
          </p>
        </div>
      )}
      <form noValidate onSubmit={onSubmit} className="flex flex-col gap-4">
        <Select
          label="I’m joining as"
          required
          options={ROLE_OPTIONS}
          value={role}
          onChange={setRole}
          placeholder="Choose your account type"
          error={errors.role}
        />
        <TextField
          label="Full name"
          required
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Aditi Sharma"
          error={errors.name}
        />
        <TextField
          label="Work email"
          required
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@company.com"
          error={errors.email}
        />
        <TextField
          label="Password"
          required
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          helper={errors.password ? undefined : "At least 8 characters."}
          error={errors.password}
        />
        <Button
          type="submit"
          fullWidth
          className="mt-2"
          trailingIcon={<ArrowRight size={16} strokeWidth={2} />}
        >
          Create free account
        </Button>
      </form>
    </AuthLayout>
  );
}
