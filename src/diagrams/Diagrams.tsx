import { Link } from "wouter";
import { useDiagrams } from "./diagram.hooks";

type Props = {
    motorcycleId: string;
};

export const Diagrams = ({ motorcycleId }: Props) => {
    const { query } = useDiagrams(motorcycleId);

    if (!query.data) {
        return (
            <div className="p-5">
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <div className="p-5 grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
            {query.data.map((diagram) => (
                <Link
                    key={diagram.id}
                    href={`/motorcycles/${motorcycleId}/diagrams/${diagram.id}`}
                >
                    <div
                        style={{
                            backgroundImage: `url(${diagram.image})`,
                        }}
                        className={`rounded-lg aspect-video bg-center bg-cover flex items-start justify-center`}
                    >
                        <div className="bg-white p-4">
                            <h2 className="font-bold text-2xl text-black">
                                {diagram.name}
                            </h2>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};
