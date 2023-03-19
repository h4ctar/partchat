import { useDiagram, useParts } from "../motorcycles/motorcycle.hook";

type Params = {
    motorcycleId: string;
    diagramId: string;
};

export const Diagram = ({ motorcycleId, diagramId }: Params) => {
    const { query: queryDiagram } = useDiagram(motorcycleId, diagramId);
    const { query: queryParts } = useParts(motorcycleId, diagramId);

    if (!queryDiagram.data || !queryParts.data) {
        return (
            <div className="p-5">
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <div className="p-5 flex max-h-[calc(100vh-42px-20px-20px)]">
            <div className="flex-grow">
                <img
                    src={queryDiagram.data.image}
                    className="max-h-full max-w-full m-auto"
                />
            </div>
            <div>
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th className="my-th">REF NO</th>
                            <th className="my-th">PART NO</th>
                            <th className="my-th">DESCRIPTION</th>
                            <th className="my-th">Q'TY</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-800">
                        {queryParts.data.map((part) => (
                            <tr key={part.id}>
                                <td className="my-td">{part.refNo}</td>
                                <td className="my-td">{part.number}</td>
                                <td className="my-td">{part.description}</td>
                                <td className="my-td">{part.qty}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
