import React, { lazy, Suspense } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

const HomeView = lazy(() => import("./views/home"));
const ProjectsView = lazy(() => import("./views/project"));

export default function App() {
    return (
        <BrowserRouter>
            <header className="bg-header shadow-lg">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <Link to="/" className="text-3xl font-title font-bold leading-tight text-gray-900 select-none">
                        David Swenson
                    </Link>
                </div>
            </header>
            <main>
                <div className="background xl:py-40" />
                <div className="bg-white max-w-7xl mx-auto py-6 xl:-mt-40 xl:mb-20 sm:px-6 lg:px-8">
                    <div className="px-4 py-4 sm:px-0">
                        <Suspense fallback={<></>}>
                            <Switch>
                                <Route path="/projects" component={ProjectsView} />
                                <Route path="/" exact={true} component={HomeView} />
                            </Switch>
                        </Suspense>
                    </div>
                </div>
            </main>
        </BrowserRouter>
    );
};
