import { useParts } from "./part.hook";

type Params = {
    diagramId: string;
};

export const Parts = ({ diagramId }: Params) => {
    const { query } = useParts(diagramId);

    if (!query.data) {
        return (
            <div className="p-5">
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <table className="table-auto w-full lg:w-auto">
            <thead>
                <tr>
                    <th className="my-th">REF NO</th>
                    <th className="my-th">PART NO</th>
                    <th className="my-th">DESCRIPTION</th>
                    <th className="my-th">QTY</th>
                </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800">
                {query.data.map((part) => (
                    <tr key={part.id}>
                        <td className="my-td">{part.refNo}</td>
                        <td className="my-td">{part.number}</td>
                        <td className="my-td">{part.description}</td>
                        <td className="my-td">{part.qty}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
