import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch } from "wouter";
import { Diagram } from "./diagrams/Diagram";
import { Home } from "./Home";
import { Motorcycle } from "./motorcycles/Motorcycle";
import { Motorcycles } from "./motorcycles/Motorcycles";
import { Navbar } from "./nav/Navbar";
import { NotFound } from "./NotFound";
import { queryClient } from "./query";

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
                    <Route path="/motorcycles/:motorcycleId/diagrams/:diagramId">
                        {(params) => <Diagram diagramId={params.diagramId!} />}
                    </Route>
                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
            </div>
        </QueryClientProvider>
    );
};
