import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

const AuthProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");
    // const [asd, setAsd] = useState("asd");

    return (
        <AuthContext.Provider value={{theme, setTheme}}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, useAuth };
