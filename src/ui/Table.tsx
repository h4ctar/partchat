import { Key } from "react";

export type RowData = [Key, (string | number | undefined)[]];

type Props = {
    headings?: string[];
    rows: RowData[];
    selectedRowKey?: Key;
    setSelectedRowKey?: (selectedRowKey?: Key) => void;
};

export const Table = ({
    headings,
    rows,
    selectedRowKey,
    setSelectedRowKey,
}: Props) => {
    return (
        <div className="max-h-full overflow-auto rounded-lg shadow-xl ring-1 ring-slate-900/5">
            <table className="border-separate border-spacing-0">
                <tbody>
                    {headings && (
                        <tr className="group">
                            {headings?.map((heading, colIndex) => (
                                <th
                                    key={colIndex}
                                    className="border-b border-slate-100 p-4 text-left font-medium text-slate-400 group-first:first:rounded-tl-lg group-first:last:rounded-tr-lg group-last:first:rounded-bl-lg group-last:last:rounded-br-lg dark:border-slate-600 dark:text-slate-200"
                                >
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    )}
                    {rows.map(([key, row]) => (
                        <tr
                            key={key}
                            onMouseEnter={() =>
                                setSelectedRowKey && setSelectedRowKey(key)
                            }
                            className={`group text-slate-500 dark:text-slate-400 ${
                                selectedRowKey === key
                                    ? "bg-slate-800 text-slate-100 dark:bg-slate-100 dark:text-slate-800"
                                    : ""
                            }`}
                        >
                            {row.map((data, colIndex) => (
                                <td
                                    key={colIndex}
                                    className="border-b border-slate-100 p-4 group-first:first:rounded-tl-lg group-first:last:rounded-tr-lg group-last:first:rounded-bl-lg group-last:last:rounded-br-lg dark:border-slate-700"
                                >
                                    {data}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
