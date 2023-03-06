import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch } from "wouter";
import { Home } from "./Home";
import { Navbar } from "./nav/Navbar";

const queryClient = new QueryClient();

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Navbar />
            <section>
                <Switch>
                    <Route path="/">
                        <Home />
                    </Route>
                    <Route>404, Not Found!</Route>
                </Switch>
            </section>
        </QueryClientProvider>
    );
};
