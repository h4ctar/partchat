import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import { useSearch } from "wouter/use-location";
import { LoginButton } from "../auth/LoginButton";
import { LogoutButton } from "../auth/LogoutButton";
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
        <div className="grid gap-5 grid-cols-2 lg:grid-cols-[auto_1fr_auto] items-center p-5 border-b dark:border-slate-50/[0.06]">
            <h2 className="text-2xl row-start-1 col-start-1 dark:text-white flex gap-2 items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    className="w-8 h-8 stroke-sky-400"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                    />
                </svg>

                <Link to="/">Part Chat</Link>
            </h2>
            <div className="lg:flex-grow lg:flex grid gap-5 grid-cols-2 row-start-2 col-start-1 col-span-2 lg:row-start-1 lg:col-start-2 lg:col-span-1">
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
            <div className="row-start-1 col-start-2 lg:col-start-3 justify-self-end">
                <LoginButton />
                <LogoutButton />
            </div>
        </div>
    );
};
