import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline, Container } from "@mui/material";
import { AuthProvider } from "./contexts/AuthContext";
import theme from "./theme";
import Register from "./components/Register";
import Login from "./components/Login";
import {
  ProtectedRoute,
  AuthenticatedRoute,
} from "./components/ProtectedRoute";
import Home from "./components/Home";
import { useAuth } from "./contexts/AuthContext";

function RoutesWrapper() {
  const { setIsAuthenticated } = useAuth();
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <Router>
      <Container
        component="main"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Routes>
          <Route
            path="/register"
            element={
              <AuthenticatedRoute negate>
                <Register />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <AuthenticatedRoute negate>
                <Login />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Container>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RoutesWrapper />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
