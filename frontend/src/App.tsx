import { QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { useAuth } from "react-oidc-context";
import { Route, Switch } from "wouter";
import { DiagramForm } from "./diagrams/DiagramForm";
import Home from "./Home";
import { Loading } from "./ui/Loading";
import { MotorcycleForm } from "./motorcycles/MotorcycleForm";
import { Navbar } from "./nav/Navbar";
import NotFound from "./ui/NotFound";
import { queryClient } from "./query";
import { SettingsContext, useSettings } from "./settings";

const MotorcycleCards = lazy(() => import("./motorcycles/MotorcycleCards"));
const Motorcycle = lazy(() => import("./motorcycles/Motorcycle"));
const Diagram = lazy(() => import("./diagrams/Diagram"));
const PartsPage = lazy(() => import("./parts/PartsPage"));

export const App = () => {
    const { settings, toggleTheme } = useSettings();
    const auth = useAuth();

    switch (auth.activeNavigator) {
        case "signinSilent":
            return <div>Signing you in...</div>;
        case "signoutRedirect":
            return <div>Signing you out...</div>;
    }

    if (auth.isLoading) {
        return <div>Loading...</div>;
    }

    if (auth.error) {
        return <div>Oops... {auth.error.message}</div>;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <SettingsContext.Provider value={settings}>
                <Navbar toggleTheme={toggleTheme} />
                <div>
                    <Switch>
                        <Route path="/">
                            <Home />
                        </Route>
                        <Route path="/motorcycles">
                            <Suspense fallback={<Loading />}>
                                <MotorcycleCards />
                            </Suspense>
                        </Route>
                        <Route path="/motorcycles/new">
                            <Suspense fallback={<Loading />}>
                                <MotorcycleForm />
                            </Suspense>
                        </Route>
                        <Route path="/motorcycles/:motorcycleId/edit">
                            {(params: any) => (
                                <Suspense fallback={<Loading />}>
                                    <MotorcycleForm
                                        motorcycleId={params.motorcycleId!}
                                    />
                                </Suspense>
                            )}
                        </Route>
                        <Route path="/motorcycles/:motorcycleId">
                            {(params: any) => (
                                <Suspense fallback={<Loading />}>
                                    <Motorcycle
                                        motorcycleId={params.motorcycleId!}
                                    />
                                </Suspense>
                            )}
                        </Route>
                        <Route path="/motorcycles/:motorcycleId/diagrams/new">
                            {(params: any) => (
                                <Suspense fallback={<Loading />}>
                                    <DiagramForm
                                        motorcycleId={params.motorcycleId!}
                                    />
                                </Suspense>
                            )}
                        </Route>
                        <Route path="/motorcycles/:motorcycleId/diagrams/:diagramId/edit">
                            {(params: any) => (
                                <Suspense fallback={<Loading />}>
                                    <DiagramForm
                                        motorcycleId={params.motorcycleId!}
                                        diagramId={params.diagramId}
                                    />
                                </Suspense>
                            )}
                        </Route>
                        <Route path="/motorcycles/:motorcycleId/diagrams/:diagramId">
                            {(params: any) => (
                                <Suspense fallback={<Loading />}>
                                    <Diagram
                                        motorcycleId={params.motorcycleId!}
                                        diagramId={params.diagramId!}
                                    />
                                </Suspense>
                            )}
                        </Route>
                        <Route path="/parts">
                            <Suspense fallback={<Loading />}>
                                <PartsPage />
                            </Suspense>
                        </Route>
                        <Route>
                            <NotFound />
                        </Route>
                    </Switch>
                </div>
            </SettingsContext.Provider>
        </QueryClientProvider>
    );
};
