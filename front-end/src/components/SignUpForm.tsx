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
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch(() => setError("Failed to load courses."))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, courseId: selectedCourse }),
      })

      if (!res.ok) throw new Error("Sign up failed")

      // Optional: Redirect or show success
      alert("Account created!")
    } catch (err) {
      setError("Failed to sign up.")
    } finally {
      setLoading(false)
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
  <Select onValueChange={setSelectedCourse}>
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
