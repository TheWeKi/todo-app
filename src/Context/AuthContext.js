import { createContext, useContext } from "react"

export const context = createContext()

export const useAuth = () => useContext(context)