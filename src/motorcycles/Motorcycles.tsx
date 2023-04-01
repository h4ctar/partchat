import { Link } from "wouter";
import { useSearch } from "wouter/use-location";
import { Spinner } from "../icons/Spinner";
import { useMotorcycles } from "./motorcycle.hook";

export const Motorcycles = () => {
    const search = useSearch();

    const searchParams = new URLSearchParams(search);
    const make = searchParams.get("make") || undefined;
    const year = parseInt(searchParams.get("year") || "") || undefined;

    const { query } = useMotorcycles(make, year);

    if (!query.data) {
        return (
            <div className="mx-auto max-w-7xl p-5">
                <Spinner />
            </div>
        );
    }

    const motorcycles = query.data;

    return (
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4">
            {motorcycles.map((motorcycle) => (
                <Link
                    key={motorcycle.id}
                    href={`/motorcycles/${motorcycle.id}`}
                    className="cursor-pointer rounded-lg dark:bg-slate-800"
                >
                    <h2 className="m-3 text-2xl font-bold">
                        {`${motorcycle.make} ${motorcycle.model} ${motorcycle.yearFrom}-${motorcycle.yearTo}`}
                    </h2>
                    <img className="rounded-b-lg" src={motorcycle.image} />
                </Link>
            ))}
        </div>
    );
};
