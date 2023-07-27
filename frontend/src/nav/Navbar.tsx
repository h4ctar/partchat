import { useState } from "react";
import { Link } from "wouter";
import { LoginButton } from "../auth/LoginButton";
import { LogoutButton } from "../auth/LogoutButton";
import { BarsIcon } from "../icons/BarsIcon";
import { ToolIcon } from "../icons/ToolIcon";
import { ThemeButton } from "./ThemeButton";

type Props = {
    toggleTheme: () => void;
};

export const Navbar = ({ toggleTheme }: Props) => {
    const [nav, setNav] = useState(false);

    const toggleNav = () => setNav(!nav);
    const hideNav = () => setNav(false);

    return (
        <div className="flex flex-row flex-wrap items-center justify-between gap-4 border-b p-5 shadow-lg ring-1 ring-slate-900/5 dark:border-slate-50/[0.06]">
            <h2 className="order-1 ">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-2xl dark:text-white"
                >
                    <ToolIcon className="h-8 w-8 stroke-sky-400" />
                    Part Chat
                </Link>
            </h2>
            <button className="order-3 sm:hidden" onClick={toggleNav}>
                <BarsIcon />
            </button>
            <div
                className={`${
                    nav ? "" : "hidden"
                } order-3 flex w-screen flex-col gap-4 sm:flex sm:w-auto sm:flex-row sm:items-center`}
            >
                <Link href="/motorcycles" onClick={hideNav}>
                    Motorcycles
                </Link>
                <Link href="/parts">Parts</Link>
                <LoginButton />
                <LogoutButton />
                <ThemeButton toggleTheme={toggleTheme} />
            </div>
        </div>
    );
};
