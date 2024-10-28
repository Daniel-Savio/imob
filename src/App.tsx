import "./App.css";
import { Toaster } from "@/components/ui/sonner";
import AppRoutes from "./routes";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <AppRoutes></AppRoutes>
      </QueryClientProvider>
    </>
  );
}

export default App;
