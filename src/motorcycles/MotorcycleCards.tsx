import { Link } from "wouter";
import { useSearch } from "wouter/use-location";
import { Loading } from "../Loading";
import { useMotorcycles } from "./motorcycle.hook";
import { ErrorMessage } from "../ui/ErrorMessage";

const MotorcycleCards = () => {
    const search = useSearch();
    const searchParams = new URLSearchParams(search);
    const make = searchParams.get("make") || undefined;
    const year = parseInt(searchParams.get("year") || "") || undefined;

    const { query } = useMotorcycles(make, year);

    if (query.isLoading) {
        return <Loading />;
    }

    if (query.isError) {
        return <ErrorMessage error={query.error} />;
    }

    const motorcycles = query.data;

    return (
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4">
            {motorcycles.map((motorcycle) => (
                <Link
                    key={motorcycle.id}
                    href={`/motorcycles/${motorcycle.id}`}
                    className="dark:highlight-white/10 relative z-10 rounded-xl bg-white shadow-xl ring-1 ring-slate-900/5 dark:bg-slate-800"
                >
                    <h2 className="mx-3 mt-3 text-2xl font-bold">
                        {`${motorcycle.make} ${motorcycle.model}`}
                    </h2>
                    <h3 className="mx-3 mb-3 text-lg text-slate-500">
                        {`${motorcycle.yearFrom}-${motorcycle.yearTo}`}
                    </h3>
                    <img className="rounded-b-lg" src={motorcycle.image} />
                </Link>
            ))}
        </div>
    );
};

export default MotorcycleCards;
