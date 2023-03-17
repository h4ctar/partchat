import { Link } from "wouter";
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
                <div>Loading...</div>
            </div>
        );
    }

    return (
        <div className="p-5">
            <ul className="grid grid-cols-4 gap-4">
                {query.data.map((motorcycle) => (
                    <li key={motorcycle.id}>
                        <Link
                            href={`/motorcycles/${motorcycle.id}`}
                            className="flex flex-col rounded-md p-3 dark:bg-slate-800"
                        >
                            <img className="h-96" src={motorcycle.image} />
                            <h2 className="font-semibold">{`${motorcycle.make} ${motorcycle.model} ${motorcycle.yearFrom}-${motorcycle.yearTo}`}</h2>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
