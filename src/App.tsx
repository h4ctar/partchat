import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch } from "wouter";
import { Home } from "./Home";
import { Motorcycle } from "./Motorcycle";
import { Motorcycles } from "./Motorcycles";
import { Navbar } from "./nav/Navbar";
import { NotFound } from "./NotFound";

const queryClient = new QueryClient();

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Navbar />
            <div>
                <Switch>
                    <Route path="/">
                        <Home />
                    </Route>
                    <Route path="/motorcycles">
                        <Motorcycles />
                    </Route>
                    <Route path="/motorcycles/:motorcycleId">
                        {(params) => (
                            <Motorcycle motorcycleId={params.motorcycleId!} />
                        )}
                    </Route>
                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
            </div>
        </QueryClientProvider>
    );
};
