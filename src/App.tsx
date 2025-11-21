import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Todos from "./components/Todos";
import "./App.css";

const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Todos />
        </QueryClientProvider>
    );
}
