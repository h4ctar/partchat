import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import { useSearch } from "wouter/use-location";
import { LoginButton } from "../auth/LoginButton";
import { LogoutButton } from "../auth/LogoutButton";
import { Bars } from "../icons/Bars";
import { Tool } from "../icons/Tool";
import { useMotorcycle } from "../motorcycles/motorcycle.hook";
import { DiagramSelect } from "./DiagramSelect";
import { MakeSelect } from "./MakeSelect";
import { ModelSelect } from "./ModelSelect";
import { ThemeButton } from "./ThemeButton";
import { YearSelect } from "./YearSelect";

type Props = {
    toggleTheme: () => void;
};

export const Navbar = ({ toggleTheme }: Props) => {
    const search = useSearch();

    const [matchMotorcycle, paramsMotorcycle] = useRoute(
        "/motorcycles/:motorcycleId",
    );
    const [matchDiagram, paramsDiagram] = useRoute(
        "/motorcycles/:motorcycleId/diagrams/:diagramId",
    );
    const motorcycleId =
        paramsMotorcycle?.motorcycleId || paramsDiagram?.motorcycleId || "";

    const { query: queryMotorcycle } = useMotorcycle(motorcycleId);

    const [selectedMake, setSelectedMake] = useState<string>();
    const [selectedYear, setSelectedYear] = useState<number>();
    const [selectedModel, setSelectedModel] = useState<string>();
    const [nav, setNav] = useState(false);

    useEffect(() => {
        if (!matchMotorcycle && !matchDiagram) {
            const searchParams = new URLSearchParams(search);
            const make = searchParams.get("make");
            const year = searchParams.get("year");
            setSelectedMake(make || undefined);
            setSelectedYear(parseInt(year || "") || undefined);
            setSelectedModel(undefined);
        }
    }, [matchMotorcycle, matchDiagram, search]);

    useEffect(() => {
        if (matchMotorcycle) {
            if (queryMotorcycle.data) {
                setSelectedMake(queryMotorcycle.data.make);
                setSelectedYear(selectedYear || queryMotorcycle.data.yearFrom);
                setSelectedModel(queryMotorcycle.data.model);
            } else {
                setSelectedModel(undefined);
            }
        }
    }, [matchMotorcycle, queryMotorcycle.data, selectedYear]);

    useEffect(() => {
        if (matchDiagram) {
            if (queryMotorcycle.data) {
                setSelectedMake(queryMotorcycle.data.make);
                setSelectedYear(selectedYear || queryMotorcycle.data.yearFrom);
                setSelectedModel(queryMotorcycle.data.model);
            }
        }
    }, [matchDiagram, queryMotorcycle.data, selectedYear]);

    const toggleNav = () => setNav(!nav);
    const hideNav = () => setNav(false);

    return (
        <div className="flex flex-row flex-wrap items-center justify-between gap-5 border-b p-5 dark:border-slate-50/[0.06]">
            <h2 className="order-1 flex items-center gap-2 text-2xl dark:text-white">
                <Tool className="h-8 w-8 flex-shrink-0 stroke-sky-400" />
                <Link to="/" className="flex-shrink-0">
                    Part Chat
                </Link>
            </h2>
            <button className="order-3 sm:hidden" onClick={toggleNav}>
                <Bars />
            </button>
            <div
                className={`${
                    nav ? "" : "hidden"
                } order-3 flex w-screen flex-col gap-5 sm:flex sm:w-auto sm:flex-row sm:items-center`}
            >
                <Link to="/motorcycles" onClick={hideNav}>
                    Motorcycles
                </Link>
                {/* <Link to="/diagrams">Diagrams</Link>
                <Link to="/parts">Parts</Link> */}
                <LoginButton />
                <LogoutButton />
                <ThemeButton toggleTheme={toggleTheme} />
            </div>
            <div className="order-4 grid w-screen grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:order-2 xl:flex xl:w-auto xl:flex-grow">
                <MakeSelect make={selectedMake} />
                {selectedMake && (
                    <YearSelect make={selectedMake} year={selectedYear} />
                )}
                {selectedMake && selectedYear && (
                    <ModelSelect
                        make={selectedMake}
                        year={selectedYear}
                        model={selectedModel}
                    />
                )}
                {motorcycleId && (
                    <DiagramSelect
                        motorcycleId={motorcycleId}
                        diagramId={paramsDiagram?.diagramId}
                    />
                )}
            </div>
        </div>
    );
};
