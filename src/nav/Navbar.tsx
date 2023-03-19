import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import { useSearch } from "wouter/use-location";
import { useMotorcycle } from "../motorcycles/motorcycle.hook";
import { DiagramSelect } from "./DiagramSelect";
import { MakeSelect } from "./MakeSelect";
import { ModelSelect } from "./ModelSelect";
import { YearSelect } from "./YearSelect";

export const Navbar = () => {
    const search = useSearch();

    const [matchMotorcycle, paramsMotorcycle] = useRoute(
        "/motorcycles/:motorcycleId"
    );
    const [matchDiagram, paramsDiagram] = useRoute(
        "/motorcycles/:motorcycleId/diagrams/:diagramId"
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
        <div className="flex lg:flex-row flex-col gap-5 p-5 border-b dark:border-slate-50/[0.06]">
            <h2 className="font-semibold">
                <Link to="/">PartSwap</Link>
            </h2>
            <div className="lg:flex-grow lg:flex gap-5 grid grid-cols-2">
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
