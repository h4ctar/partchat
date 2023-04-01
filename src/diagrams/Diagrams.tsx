import { Link } from "wouter";
import { useDiagrams } from "./diagram.hooks";

type Props = {
    motorcycleId: string;
};

export const Diagrams = ({ motorcycleId }: Props) => {
    const { query } = useDiagrams(motorcycleId);

    if (!query.data) {
        return (
            <div className="mx-auto max-w-7xl p-5">
                <h1>Loading...</h1>
            </div>
        );
    }

    const diagrams = query.data;

    return (
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4">
            {diagrams.map((diagram) => (
                <Link
                    key={diagram.id}
                    href={`/motorcycles/${motorcycleId}/diagrams/${diagram.id}`}
                    className="cursor-pointer rounded-lg dark:bg-slate-800"
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
