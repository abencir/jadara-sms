import { useAuth } from "@/context/AuthContext"
import { Navigate } from "react-router-dom"
import { ReactNode } from "react"

type PrivateRouteProps = {
  children: ReactNode
  allowedRoles?: string[]
}

const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return <>{children}</>
}

export default PrivateRoute
