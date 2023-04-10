import { Link } from "wouter";
import { Loading } from "../Loading";
import { useDiagrams } from "./diagram.hooks";

type Props = {
    motorcycleId: string;
};

export const Diagrams = ({ motorcycleId }: Props) => {
    const { query } = useDiagrams(motorcycleId);

    if (!query.data) {
        return <Loading />;
    }

    const diagrams = query.data;

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
                        src={diagram.image}
                    />
                </Link>
            ))}
        </div>
    );
};
