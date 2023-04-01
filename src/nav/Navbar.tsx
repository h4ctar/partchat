import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import { useSearch } from "wouter/use-location";
import { LoginButton } from "../auth/LoginButton";
import { LogoutButton } from "../auth/LogoutButton";
import { Tool } from "../icons/Tool";
import { useMotorcycle } from "../motorcycles/motorcycle.hook";
import { DiagramSelect } from "./DiagramSelect";
import { MakeSelect } from "./MakeSelect";
import { ModelSelect } from "./ModelSelect";
import { YearSelect } from "./YearSelect";

export const Navbar = () => {
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

    return (
        <div className="grid grid-cols-2 items-center gap-5 border-b p-5 dark:border-slate-50/[0.06] lg:grid-cols-[auto_1fr_auto]">
            <h2 className="col-start-1 row-start-1 flex items-center gap-2 text-2xl dark:text-white">
                <Tool className="h-8 w-8 stroke-sky-400" />
                <Link to="/">Part Chat</Link>
            </h2>
            <div className="col-span-2 col-start-1 row-start-2 grid grid-cols-2 gap-5 lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:flex lg:flex-grow">
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
            <div className="col-start-2 row-start-1 justify-self-end lg:col-start-3">
                <LoginButton />
                <LogoutButton />
            </div>
        </div>
    );
};
