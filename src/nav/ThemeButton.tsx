import { useContext } from "react";
import { MoonIcon } from "../icons/MoonIcon";
import { SunIcon } from "../icons/SunIcon";
import { SettingsContext } from "../settings";

type Props = {
    toggleTheme: () => void;
};

export const ThemeButton = ({ toggleTheme }: Props) => {
    const settings = useContext(SettingsContext);

    return (
        <button onClick={toggleTheme}>
            {settings.theme === "dark" ? (
                <MoonIcon className="h-8 w-8 stroke-sky-400" />
            ) : (
                <SunIcon className="h-8 w-8 stroke-sky-400" />
            )}
        </button>
    );
};
