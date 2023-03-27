import { LoginButton } from "./auth/LoginButton";

export const Home = () => {
    return (
        <div className="p-5">
            <div className="relative max-w-7xl mx-auto pt-20 sm:pt-24 lg:pt-32">
                <h1 className="text-slate-900 text-4xl tracking-tight font-extrabold sm:text-5xl dark:text-white text-center">
                    Organised library of technical information to help maintain
                    old bikes and cars.
                </h1>
            </div>
            <div className="relative max-w-7xl mx-auto pt-20 sm:pt-24 lg:pt-32">
                <h1 className="text-slate-900 text-4xl tracking-tight font-extrabold sm:text-5xl dark:text-white text-center">
                    Reddit style discussions pinned to vehicles, diagrams and
                    parts.
                </h1>
                <p className="mt-6 text-lg text-slate-600 text-center max-w-3xl mx-auto dark:text-slate-400">
                    Easily find the thread you need.
                </p>
            </div>
            <div className="relative max-w-7xl mx-auto pt-20 sm:pt-24 lg:pt-32">
                <h1 className="text-slate-900 text-4xl tracking-tight font-extrabold sm:text-5xl dark:text-white text-center">
                    Compatible part catalogue.
                </h1>
                <p className="mt-6 text-lg text-slate-600 text-center max-w-3xl mx-auto dark:text-slate-400">
                    Search for alternative parts and discover what donors
                    provide them.
                </p>
            </div>
            <div className="relative max-w-7xl mx-auto p-20 sm:pt-24 lg:pt-32">
                <h1 className="text-slate-900 text-4xl tracking-tight font-extrabold sm:text-5xl dark:text-white text-center">
                    Offline mode.
                </h1>
                <p className="mt-6 text-lg text-slate-600 text-center max-w-3xl mx-auto dark:text-slate-400">
                    Page data is cached locally so you can keep reading after
                    WiFi drops.
                </p>
            </div>
        </div>
    );
};
