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
        <div className="h-full overflow-auto rounded-lg shadow-xl ring-1 ring-slate-900/5">
            <table className="w-full border-separate border-spacing-0">
                <tbody>
                    {headings && (
                        <tr className="group">
                            {headings?.map((heading, colIndex) => (
                                <th
                                    key={colIndex}
                                    className="border-b border-slate-100 p-4 text-left text-sm font-medium text-slate-400 group-first:first:rounded-tl-lg group-first:last:rounded-tr-lg group-last:first:rounded-bl-lg group-last:last:rounded-br-lg dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 lg:text-base"
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
                            className={`group ${
                                selectedRowKey === key
                                    ? "bg-slate-800 text-slate-100 dark:bg-slate-100 dark:text-slate-800"
                                    : "text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                            }`}
                        >
                            {row.map((data, colIndex) => (
                                <td
                                    key={colIndex}
                                    className="border-b border-slate-100 p-4 text-sm group-first:first:rounded-tl-lg group-first:last:rounded-tr-lg group-last:first:rounded-bl-lg group-last:last:rounded-br-lg dark:border-slate-700 lg:text-base"
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
