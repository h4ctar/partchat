import { Link } from "wouter";
import { Loading } from "../Loading";
import { useFetchDiagrams } from "./diagram.hooks";
import { ErrorMessage } from "../ui/ErrorMessage";
import { PlusIcon } from "../icons/PlusIcon";
import { useAuth } from "react-oidc-context";

type Props = {
    motorcycleId: string;
};

export const DiagramCards = ({ motorcycleId }: Props) => {
    const { isAuthenticated } = useAuth();
    const fetchDiagrams = useFetchDiagrams(motorcycleId);

    if (fetchDiagrams.isLoading) {
        return <Loading />;
    }

    if (fetchDiagrams.isError) {
        return (
            <div className="mx-auto max-w-7xl p-5">
                <ErrorMessage error={fetchDiagrams.error} />
            </div>
        );
    }

    const diagrams = fetchDiagrams.data;

    return (
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4">
            {diagrams.map((diagram) => (
                <Link
                    key={diagram.id}
                    href={`/motorcycles/${motorcycleId}/diagrams/${diagram.id}`}
                    className="dark:highlight-white/10 relative z-10 rounded-xl bg-white shadow-xl ring-1 ring-slate-900/5 dark:bg-slate-800"
                >
                    <h2 className="m-3 text-2xl font-bold">{diagram.name}</h2>
                    <img
                        className="aspect-video w-full rounded-b-lg object-cover"
                        src={`/public/diagrams/${diagram.id}.png`}
                    />
                </Link>
            ))}
            {isAuthenticated && (
                <Link
                    href={`/motorcycles/${motorcycleId}/diagrams/new`}
                    className="dark:highlight-white/10 relative z-10 flex flex-col items-center justify-center gap-2 rounded-xl bg-white p-8 text-lg shadow-xl ring-1 ring-slate-900/5 dark:bg-slate-800"
                >
                    <PlusIcon />
                    Add diagram
                </Link>
            )}
        </div>
    );
};
