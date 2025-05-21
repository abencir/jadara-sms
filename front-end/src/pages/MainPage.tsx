import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function MainPage() {
  const [name, setName] = useState("")

  const handleClick = () => {
    alert(`Hello, ${name || "stranger"}! 🎉`)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Welcome to Jadara SMS 📱</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input 
            type="text" 
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button onClick={handleClick} className="w-full">
            Say Hello 👋
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
