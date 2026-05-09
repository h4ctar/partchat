import { createContext, useEffect, useState } from "react";

type Settings = {
    theme: "dark" | "light";
};

export const SettingsContext = createContext<Settings>({ theme: "dark" });

export const useSettings = () => {
    const [settings, setSettings] = useState<Settings>({
        theme: (localStorage.theme as "dark" | "light") ?? "dark",
    });

    useEffect(() => {
        if (settings.theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [settings.theme]);

    const toggleTheme = () => {
        const newTheme = settings.theme === "dark" ? "light" : "dark";
        localStorage.theme = newTheme;
        setSettings({ theme: newTheme });
    };

    return {
        settings,
        toggleTheme,
    };
};
