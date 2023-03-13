import { useSearch } from "wouter/use-location";
import { useMotorcycles } from "./motorcycle.hook";

export const Motorcycles = () => {
    const search = useSearch();

    const searchParams = new URLSearchParams(search);
    const make = searchParams.get("make") || undefined;
    const year = parseInt(searchParams.get("year") || "") || undefined;

    const { query } = useMotorcycles(make, year);

    if (!query.data) {
        return (
            <div className="p-5">
                <h1>Motorcycles</h1>
                <div>Loading...</div>
            </div>
        );
    }

    return (
        <div className="p-5">
            <h1>Motorcycles</h1>
            <ul className="grid grid-cols-2 gap-4">
                {query.data.map((motorcycle) => (
                    <li
                        key={motorcycle.id}
                        className="rounded-md ring-1 ring-slate-200 p-3 bg-white"
                    >
                        {motorcycle.model}
                    </li>
                ))}
            </ul>
        </div>
    );
};
