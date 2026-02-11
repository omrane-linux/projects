import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Auth/login";

// Landing page
import LandingHome from "./pages/Dashboard/Home";

// Dashboard pages (after login)
import Dashboard from "./pages/Dashboard/dashboard";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import ExpenseTracker from "./pages/Dashboard/ExpenseTracker";
import AiRecommendation from "./pages/Dashboard/AiRecommendation";
import Stocks from "./pages/Dashboard/Stocks";


import { ProtectedRoute, PublicRoute } from "./components/ProtectedRoute";
import AppLayout from "./layout/AppLayout";
import { HelmetProvider } from "react-helmet-async";

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingHome />} />

          {/* Login */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          {/* Dashboard (after login) */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            {/* These pages will appear INSIDE the <Outlet /> of AppLayout */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expense" element={<Expense />} />
            <Route path="/expense-tracker" element={<ExpenseTracker />} />
            <Route path="/ai-recommendation" element={<AiRecommendation />} />
            <Route path="/stocks" element={<Stocks />} />


            {/* Add more dashboard pages here in the future */}
            {/* <Route path="/profile" element={<Profile />} /> */}
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
};

export default App;
