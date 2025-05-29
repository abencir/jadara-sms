import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAuth } from '@/context/AuthContext';

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login: saveUser, user } = useAuth();

  useEffect(() => {
    if (user?.role === 'Admin') {
      navigate('/admindashboard');
    } else if (user?.role === 'Student') {
      navigate('/studentdashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });
  
      const data = res.data;
  
      localStorage.setItem("token", data.token);
  
      saveUser({
        id: data.user.id,
        email: data.user.email,
        role: data.user.role,
      });
  
      if (data.user.role === 'Admin') {
        navigate('/admindashboard');
      } else if (data.user.role === 'Student') {
        navigate('/studentdashboard');
      } else {
        setError("Unknown role. Cannot redirect.");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {error && <p className="text-sm text-red-600">{error}</p>}

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="email">Email</Label>
                  <div className="ml-auto" />
                </div>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </div>

            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/register" className="underline underline-offset-4">Sign up</a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}