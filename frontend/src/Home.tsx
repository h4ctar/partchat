import { Link } from "wouter";
import { LoginButton } from "./auth/LoginButton";

const Home = () => {
    return (
        <div className="p-5">
            <div className="relative mx-auto max-w-7xl pt-20 sm:pt-24 lg:pt-32">
                <h1 className="text-center text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                    Organised library of technical information to help maintain
                    old bikes and cars.
                </h1>
                <div className="flex w-full flex-row items-center justify-center gap-4 p-5">
                    <Link
                        to="/motorcycles"
                        className="dark:highlight-white/20 flex h-8 w-full items-center justify-center rounded-lg bg-slate-900 px-6 font-semibold text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 dark:bg-sky-500 dark:hover:bg-sky-400 sm:w-auto"
                    >
                        Find your bike
                    </Link>
                    <LoginButton buttonText="Register to contribute" />
                </div>
            </div>
            <div className="relative mx-auto max-w-7xl pt-20 sm:pt-24 lg:pt-32">
                <h1 className="text-center text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                    Reddit style discussions pinned to vehicles, diagrams and
                    parts.
                </h1>
                <p className="mx-auto mt-6 max-w-3xl text-center text-lg text-slate-600 dark:text-slate-400">
                    Easily find the thread you need.
                </p>
            </div>
            <div className="relative mx-auto max-w-7xl pt-20 sm:pt-24 lg:pt-32">
                <h1 className="text-center text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                    Compatible part catalogue.
                </h1>
                <p className="mx-auto mt-6 max-w-3xl text-center text-lg text-slate-600 dark:text-slate-400">
                    Search for alternative parts and discover what donors
                    provide them.
                </p>
            </div>
            <div className="relative mx-auto max-w-7xl p-20 sm:pt-24 lg:pt-32">
                <h1 className="text-center text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                    Offline mode.
                </h1>
                <p className="mx-auto mt-6 max-w-3xl text-center text-lg text-slate-600 dark:text-slate-400">
                    Page data is cached locally so you can keep reading after
                    WiFi drops.
                </p>
            </div>
        </div>
    );
};

export default Home;
