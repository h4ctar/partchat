import { Link } from "wouter";
import { useDiagrams } from "./diagram.hooks";

type Props = {
    motorcycleId: string;
};

export const Diagrams = ({ motorcycleId }: Props) => {
    const { query } = useDiagrams(motorcycleId);

    if (!query.data) {
        return (
            <div className="p-5 max-w-7xl mx-auto">
                <h1>Loading...</h1>
            </div>
        );
    }

    const diagrams = query.data;

    return (
        <div className="p-5 grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 max-w-7xl mx-auto">
            {diagrams.map((diagram) => (
                <Link
                    key={diagram.id}
                    href={`/motorcycles/${motorcycleId}/diagrams/${diagram.id}`}
                    className="rounded-lg dark:bg-slate-800 cursor-pointer"
                >
                    <h2 className="font-bold text-2xl m-3">{diagram.name}</h2>
                    <img
                        className="rounded-b-lg object-cover w-full aspect-video"
                        src={diagram.image}
                    />
                </Link>
            ))}
        </div>
    );
};
