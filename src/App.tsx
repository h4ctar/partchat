import { QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import { Loading } from "./Loading";
import { Navbar } from "./nav/Navbar";
import { queryClient } from "./query";
import { SettingsContext, useSettings } from "./settings";

const Home = lazy(() => import("./Home"));
const MotorcycleCards = lazy(() => import("./motorcycles/MotorcycleCards"));
const Motorcycle = lazy(() => import("./motorcycles/Motorcycle"));
const Diagram = lazy(() => import("./diagrams/Diagram"));
const PartsPage = lazy(() => import("./parts/PartsPage"));
const NotFound = lazy(() => import("./NotFound"));

export const App = () => {
    const { settings, toggleTheme } = useSettings();

    return (
        <QueryClientProvider client={queryClient}>
            <SettingsContext.Provider value={settings}>
                <Navbar toggleTheme={toggleTheme} />
                <div>
                    <Switch>
                        <Route path="/">
                            <Suspense fallback={<Loading />}>
                                <Home />
                            </Suspense>
                        </Route>
                        <Route path="/motorcycles">
                            <Suspense fallback={<Loading />}>
                                <MotorcycleCards />
                            </Suspense>
                        </Route>
                        <Route path="/motorcycles/:motorcycleId">
                            {(params) => (
                                <Suspense fallback={<Loading />}>
                                    <Motorcycle
                                        motorcycleId={params.motorcycleId!}
                                    />
                                </Suspense>
                            )}
                        </Route>
                        <Route path="/motorcycles/:motorcycleId/diagrams/:diagramId">
                            {(params) => (
                                <Suspense fallback={<Loading />}>
                                    <Diagram diagramId={params.diagramId!} />
                                </Suspense>
                            )}
                        </Route>
                        <Route path="/parts">
                            <Suspense fallback={<Loading />}>
                                <PartsPage />
                            </Suspense>
                        </Route>
                        <Route>
                            <Suspense fallback={<Loading />}>
                                <NotFound />
                            </Suspense>
                        </Route>
                    </Switch>
                </div>
            </SettingsContext.Provider>
        </QueryClientProvider>
    );
};
