import * as React from "react";
import Layout from "../components/Layout/Layout";
import { Route, Routes } from "react-router-dom";
import PayPage from "../pages/PayPage/PayPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import MainPage from "../pages/MainPage/MainPage";
import TaskPage from "../pages/TaskPage/TaskPage";
import ProjectList from "../pages/ProjectList/ProjectList";
import { ErrorBoundary } from "react-error-boundary";
import AuthPage from "../pages/AuthPage/AuthPage";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Ops, something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  );
}


function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Layout>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/tasks" element={<TaskPage />} />
          <Route path="/pay" element={<PayPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route index element={<MainPage />} />
        </Routes>
      </Layout>
    </ErrorBoundary>
  );
}

export default App;
