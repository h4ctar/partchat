import { QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import { Loading } from "./Loading";
import { Navbar } from "./nav/Navbar";
import { queryClient } from "./query";
import { SettingsContext, useSettings } from "./settings";
import Home from "./Home";
import NotFound from "./NotFound";
import { MotorcycleForm } from "./motorcycles/MotorcycleForm";

const MotorcycleCards = lazy(() => import("./motorcycles/MotorcycleCards"));
const Motorcycle = lazy(() => import("./motorcycles/Motorcycle"));
const Diagram = lazy(() => import("./diagrams/Diagram"));
const PartsPage = lazy(() => import("./parts/PartsPage"));

export const App = () => {
    const { settings, toggleTheme } = useSettings();

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
                            {(params) => (
                                <Suspense fallback={<Loading />}>
                                    <MotorcycleForm
                                        motorcycleId={params.motorcycleId!}
                                    />
                                </Suspense>
                            )}
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
                            <NotFound />
                        </Route>
                    </Switch>
                </div>
            </SettingsContext.Provider>
        </QueryClientProvider>
    );
};
