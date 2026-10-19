import { Children, createContext, useState } from "react";

export const authContext = createContext()

export const authProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    
}