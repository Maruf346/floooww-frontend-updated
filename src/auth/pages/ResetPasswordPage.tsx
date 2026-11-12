import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/common/components/ui/Button";
import { TextField } from "@/common/components/ui/TextField";
import { ROUTES } from "@/common/constants/routes";
import { AuthLayout } from "@/auth/components/AuthLayout";

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [logout, setLogout] = useState(true);
  const [error, setError] = useState("");
  const isStrong = password.length >= 10 && /\d/.test(password) && /[^A-Za-z0-9]/.test(password);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!isStrong || password !== confirm) {
      setError("Passwords must match and include 10 characters, a number and a symbol.");
      return;
    }
    navigate(ROUTES.login);
  };
  return (
    <AuthLayout>
      <form noValidate onSubmit={submit} className="w-full max-w-[440px]">
        <h1 className="font-inter-bold text-[30px] font-bold leading-[38px] tracking-[-.6px] text-ink">
          Set a new password
        </h1>
        <p className="mt-2 text-[15px] leading-[22px] text-[#6b7280]">
          Use at least 10 characters with a number and a symbol.
        </p>
        <div className="mt-5 space-y-3.5">
          <TextField
            label="New password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            helper={password ? (isStrong ? "Strong" : "Add a number and a symbol.") : undefined}
          />
          <TextField
            label="Confirm new password"
            type="password"
            autoComplete="new-password"
            value={confirm}
            onChange={(event) => setConfirm(event.target.value)}
            error={error}
          />
        </div>
        <button
          type="button"
          onClick={() => setLogout((value) => !value)}
          className="mt-4 flex items-center gap-2 text-[13px] text-[#4b5563]"
        >
          <span
            className={`grid size-[18px] place-items-center rounded-[5px] border ${logout ? "border-primary bg-primary text-white" : "border-line-strong"}`}
          >
            {logout && <Check size={13} strokeWidth={3} />}
          </span>
          Log me out on other devices
        </button>
        <Button type="submit" fullWidth className="mt-4 rounded-[8px]">
          Save and log in
        </Button>
      </form>
    </AuthLayout>
  );
}
