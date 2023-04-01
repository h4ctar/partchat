import { Spinner } from "../icons/Spinner";
import { useParts } from "./part.hook";

type Props = {
    diagramId: string;
    setSelectedRefNo: (selectedRefNo?: number) => void;
};

export const PartsTable = ({ diagramId, setSelectedRefNo }: Props) => {
    const { query } = useParts(diagramId);

    if (!query.data) {
        return (
            <div className="w-full p-5">
                <Spinner />
            </div>
        );
    }

    const parts = query.data;

    return (
        <table className="w-full table-auto lg:w-auto">
            <thead>
                <tr>
                    <th className="my-th">REF NO</th>
                    <th className="my-th">PART NO</th>
                    <th className="my-th">DESCRIPTION</th>
                    <th className="my-th">QTY</th>
                </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800">
                {parts.map((part) => (
                    <tr
                        key={part.refNo}
                        onMouseEnter={() => setSelectedRefNo(part.refNo)}
                    >
                        <td className="my-td">{part.refNo}</td>
                        <td className="my-td">{part.partNumber}</td>
                        <td className="my-td">{part.description}</td>
                        <td className="my-td">{part.qty}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
