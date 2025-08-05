// import React, { createContext, useEffect, useState } from "react";

// export const AuthContext = createContext<{
//     isAuthenticated: boolean;
//     logout: () => void;
// } | undefined>(undefined);

// export const AuthProvider : React.FC<{ children: React.ReactNode }> = ({children}) => {
//     const [isAuthenticated, setAuthenticated] = useState(false);

//     useEffect(() => {
//         const token = localStorage.getItem('access-token');
//         token ? setAuthenticated(true) : setAuthenticated(false);
//     }, []);

//     const logout = () => {
//         localStorage.removeItem('access_token');
//         localStorage.removeItem('refresh_token');
        
//         setAuthenticated(false);
//     };

//     return (
//         <AuthContext.Provider value={{isAuthenticated, logout}}>
//             {children}
//         </AuthContext.Provider>
//     );
// }