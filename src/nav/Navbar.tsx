import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import { useSearch } from "wouter/use-location";
import { useMotorcycle } from "../motorcycles/motorcycle.hook";
import { MakeSelect } from "./MakeSelect";
import { ModelSelect } from "./ModelSelect";
import { YearSelect } from "./YearSelect";

export const Navbar = () => {
    const [match, params] = useRoute("/motorcycles/:motorcycleId");
    const search = useSearch();
    const { query } = useMotorcycle(params?.motorcycleId || "");
    const [selectedMake, setSelectedMake] = useState<string>();
    const [selectedYear, setSelectedYear] = useState<number>();
    const [selectedModel, setSelectedModel] = useState<string>();

    useEffect(() => {
        if (!match) {
            const searchParams = new URLSearchParams(search);
            const make = searchParams.get("make");
            const year = searchParams.get("year");
            setSelectedMake(make || undefined);
            setSelectedYear(parseInt(year || "") || undefined);
            setSelectedModel(undefined);
        }
    }, [match, search]);

    useEffect(() => {
        if (match) {
            if (query.data) {
                setSelectedMake(query.data.make);
                setSelectedYear(selectedYear || query.data.yearFrom);
                setSelectedModel(query.data.model);
            } else {
                setSelectedModel(undefined);
            }
        }
    }, [match, query.data?.make]);

    return (
        <div className="flex flex-wrap gap-5 items-center p-5 border-b dark:border-slate-50/[0.06]">
            <h2>
                <Link to="/">PartSwap</Link>
            </h2>
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
        </div>
    );
};
