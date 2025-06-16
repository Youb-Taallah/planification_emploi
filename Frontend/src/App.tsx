import { Routes, Route, Navigate } from "react-router-dom";
import PublicRouter from "./routers/PublicRouter";
import Error404 from "./pages/public/Error404";
import Error403 from "./pages/public/Error403";
import Error500 from "./pages/public/Error500";
import StudentRouter from "./routers/StudentRouter";
import AdminRouter from "./routers/AdminRouter.tsx";
import { UseAuthStore } from "./Auth/AuthStore";
import { validateToken } from "./Auth/AuthService";
import { useEffect } from "react";
import Loading from "./components/Loading";

function App() {
  const { isAuthenticated, role, loading } = UseAuthStore();

  useEffect(() => {
    validateToken();
  }, []);

  return (
    <div>
      {loading && <Loading />}
      {!loading && (
        <Routes>
          <Route path="/*" element={ isAuthenticated && role === "ADMIN" ? <Navigate to="/admin" /> : isAuthenticated && role === "STUDENT" ? <Navigate to="/student" /> : <PublicRouter />} />
          <Route path="/student/*" element={ isAuthenticated && role === "STUDENT" ? <StudentRouter /> : <Navigate to="/login" /> } />
          <Route path="/admin/*" element={ isAuthenticated && role === "ADMIN" ? <AdminRouter/> : <Navigate to="/login" /> } />
          <Route path="/403" element={<Error403 />} />
          <Route path="/404" element={<Error404 />} />
          <Route path="/500" element={<Error500 />} />
        </Routes>
      )}
    </div>
  );
}

export default App;