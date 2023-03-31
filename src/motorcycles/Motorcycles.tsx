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
            <div className="p-5 max-w-7xl mx-auto">
                <div>Loading...</div>
            </div>
        );
    }

    const motorcycles = query.data;

    return (
        <div className="p-5 grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
            {motorcycles.map((motorcycle) => (
                <Link
                    key={motorcycle.id}
                    href={`/motorcycles/${motorcycle.id}`}
                    className="rounded-lg dark:bg-slate-800 cursor-pointer"
                >
                    <h2 className="font-bold text-2xl m-3">
                        {`${motorcycle.make} ${motorcycle.model} ${motorcycle.yearFrom}-${motorcycle.yearTo}`}
                    </h2>
                    <img className="rounded-b-lg" src={motorcycle.image} />
                </Link>
            ))}
        </div>
    );
};
