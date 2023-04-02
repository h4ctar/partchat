import { useContext } from "react";
import { Moon } from "../icons/Moon";
import { Sun } from "../icons/Sun";
import { SettingsContext } from "../settings";

type Props = {
    toggleTheme: () => void;
};

export const ThemeButton = ({ toggleTheme }: Props) => {
    const settings = useContext(SettingsContext);

    return (
        <button onClick={toggleTheme}>
            {settings.theme === "dark" ? (
                <Moon className="h-8 w-8 stroke-sky-400" />
            ) : (
                <Sun className="h-8 w-8 stroke-sky-400" />
            )}
        </button>
    );
};
