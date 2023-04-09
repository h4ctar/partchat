type Props = {
    headings?: string[];
    rows: (string | number | undefined)[][];
};

export const Table = ({ headings, rows }: Props) => {
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
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className="group">
                            {row.map((data, colIndex) => (
                                <td
                                    key={colIndex}
                                    className="border-b border-slate-100 p-4 text-slate-500 group-first:first:rounded-tl-lg group-first:last:rounded-tr-lg group-last:first:rounded-bl-lg group-last:last:rounded-br-lg dark:border-slate-700 dark:text-slate-400"
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
