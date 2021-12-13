import { getMaxListeners } from "node:process";
import React, { useContext, useState, useEffect } from "react";
import { auth } from "../config";
const AuthContext = React.createContext<any>({})

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const value = {
        signup,
    }
    function signup(email, password) {
        console.log(email);
        console.log(password);
        return auth.createUserWithEmailAndPassword(email,password)
    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          setCurrentUser(user as any );
          setLoading(false)
        })
    
        return unsubscribe
      }, [])
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
