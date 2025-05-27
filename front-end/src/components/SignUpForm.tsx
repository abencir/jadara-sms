import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

type Course = {
  id: string
  name: string
}

export default function SignUpForm() {
  const [courses, setCourses] = useState<Course[]>([])
  const [selectedCourse, setSelectedCourse] = useState<string>("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/courses/course')
      .then(({ data }) => {
        console.log("Fetched data:", data);

        const coursesArray = data.courses || data; // fallback if no wrapper
        const mappedCourses = coursesArray.map((course: any) => ({
          id: course._id,
          name: course.title,
        }));
        setCourses(mappedCourses);
      })
      .catch((err) => {
        console.error('Axios fetch error:', err);
        setError('Failed to load courses.');
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
  
  
    try {
      const res = await axios.post('http://localhost:5000/api/users/studentRegister', {
        name,
        email,
        password,
        course: selectedCourse,
      });
  
      navigate('/login');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const message = err.response.data || "";
        if (typeof message === "string" && message.toLowerCase().includes("email")) {
          setError("This email is already exist.");
        } else {
          setError(message || "Registration failed");
        }
      } else {
        setError("Registration failed");
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <div className="w-full max-w-md mx-auto px-4 py-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>Enter your details to create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
  {error && <p className="text-sm text-red-600">{error}</p>}

  <div className="grid gap-2">
    <div className="flex items-center">
      <Label htmlFor="name">Name</Label>
      <div className="ml-auto" />
    </div>
    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
  </div>

  <div className="grid gap-2">
    <div className="flex items-center">
      <Label htmlFor="email">Email</Label>
      <div className="ml-auto" />
    </div>
    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
  </div>

  <div className="grid gap-2">
    <div className="flex items-center">
      <Label htmlFor="password">Password</Label>
      <div className="ml-auto" />
    </div>
    <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
  </div>

  <div className="grid gap-2">
  <div className="flex items-center">
    <Label htmlFor="courses">Courses</Label>
    <div className="ml-auto" />
  </div>
  <Select  value={selectedCourse} onValueChange={setSelectedCourse}>
    <SelectTrigger id="courses">
      <SelectValue placeholder="Select a course" />
    </SelectTrigger>
    <SelectContent>
      {courses.map((course) => (
        <SelectItem key={course.id} value={course.id}>
          {course.name}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>

  <Button type="submit" className="w-full" disabled={loading}>
    {loading ? "Signing Up..." : "Sign Up"}
  </Button>

  <div className="text-center text-sm">
    Already have an account?{" "}
    <a href="/login" className="underline underline-offset-4">Login</a>
  </div>
</form>

        </CardContent>
      </Card>
    </div>
  )
}
