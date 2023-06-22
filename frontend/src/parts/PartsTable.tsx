import { useMemo } from "react";
import { Loading } from "../Loading";
import { ErrorMessage } from "../ui/ErrorMessage";
import { RowData, Table } from "../ui/Table";
import { useParts } from "./part.hook";

type Props = {
    diagramId?: string;
    selectedPart?: number | string;
    setSelectedPart: (selectedPart?: number | string) => void;
};

const HEADINGS = ["PART NO", "DESCRIPTION"];
const HEADINGS_DIAGRAM = ["REF NO", "PART NO", "DESCRIPTION", "QTY"];

export const PartsTable = ({
    diagramId,
    selectedPart,
    setSelectedPart,
}: Props) => {
    const { query } = useParts({ diagramId });

    const rows = useMemo(
        () =>
            query.data?.map(
                (part) =>
                    [
                        part.refNo || part.partNumber,
                        diagramId
                            ? [
                                  part.refNo,
                                  part.partNumber,
                                  part.description,
                                  part.qty,
                              ]
                            : [part.partNumber, part.description],
                    ] as RowData,
            ) || [],
        [query.data],
    );

    if (query.isLoading) {
        return (
            <div className="mx-auto w-full lg:w-80">
                <Loading />
            </div>
        );
    }

    if (query.isError) {
        return (
            <div className="mx-auto w-full lg:w-80">
                <ErrorMessage error={query.error} />
            </div>
        );
    }

    return (
        <Table
            headings={diagramId ? HEADINGS_DIAGRAM : HEADINGS}
            rows={rows}
            selectedRowKey={selectedPart}
            setSelectedRowKey={(key) => setSelectedPart(key)}
        />
    );
};
