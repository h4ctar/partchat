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
        <div className="p-5 grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
            {query.data.map((motorcycle) => (
                <Link
                    key={motorcycle.id}
                    href={`/motorcycles/${motorcycle.id}`}
                    className="rounded-md p-3 dark:bg-slate-800"
                >
                    <h2 className="font-bold text-xl mb-3">
                        {motorcycle.model}
                    </h2>
                    <img src={motorcycle.image} />
                </Link>
            ))}
        </div>
    );
};
