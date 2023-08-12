import { useAuth } from "react-oidc-context";
import { Link } from "wouter";
import { Loading } from "../Loading";
import { PlusIcon } from "../icons/PlusIcon";
import { ErrorMessage } from "../ui/ErrorMessage";
import { useFetchMotorcycles } from "./motorcycle.hook";

const MotorcycleCards = () => {
    const { isAuthenticated } = useAuth();
    const fetchMotorcycles = useFetchMotorcycles();

    if (fetchMotorcycles.isLoading) {
        return <Loading />;
    }

    if (fetchMotorcycles.isError) {
        return (
            <div className="mx-auto max-w-7xl p-5">
                <ErrorMessage error={fetchMotorcycles.error} />
            </div>
        );
    }

    const motorcycles = fetchMotorcycles.data;

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
                    <img
                        className="rounded-b-lg"
                        src={`/public/motorcycles/${motorcycle.id}.png`}
                    />
                </Link>
            ))}
            {isAuthenticated && (
                <Link
                    href="/motorcycles/new"
                    className="dark:highlight-white/10 relative z-10 flex flex-col items-center justify-center gap-2 rounded-xl bg-white p-8 text-lg shadow-xl ring-1 ring-slate-900/5 dark:bg-slate-800"
                >
                    <PlusIcon />
                    Add motorcycle
                </Link>
            )}
        </div>
    );
};

export default MotorcycleCards;
