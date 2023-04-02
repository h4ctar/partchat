import { createContext, useEffect, useState } from "react";

type Settings = {
    theme: "dark" | "light";
};

export const SettingsContext = createContext<Settings>({ theme: "dark" });

export const useSettings = () => {
    const [settings, setSettings] = useState<Settings>({ theme: "dark" });

    useEffect(() => {
        setSettings({ ...settings, theme: localStorage.theme });
        updateThemeClass();
    }, []);

    const toggleTheme = () => {
        localStorage.theme = settings.theme === "dark" ? "light" : "dark";
        setSettings({ ...settings, theme: localStorage.theme });
        updateThemeClass();
    };

    const updateThemeClass = () => {
        if (
            localStorage.theme === "dark" ||
            (!("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    return {
        settings,
        toggleTheme,
    };
};
