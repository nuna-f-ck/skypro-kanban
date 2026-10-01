import AuthProvider from "./context/AuthProvider";
import TaskProvider from "./context/TaskProvider";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <AppRoutes />
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
