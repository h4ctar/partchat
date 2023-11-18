import { useMemo } from "react";
import { Loading } from "../ui/Loading";
import { ErrorMessage } from "../ui/ErrorMessage";
import { RowData, Table } from "../ui/Table";
import { useFetchParts } from "./part.hook";

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
    const fetchParts = useFetchParts({ diagramId });

    const rows = useMemo(
        () =>
            fetchParts.data?.map(
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
        [fetchParts.data],
    );

    if (fetchParts.isLoading) {
        return (
            <div className="mx-auto w-full lg:w-80">
                <Loading />
            </div>
        );
    }

    if (fetchParts.isError) {
        return (
            <div className="mx-auto max-w-7xl">
                <ErrorMessage error={fetchParts.error} />
            </div>
        );
    }

    return (
        <Table
            headings={diagramId ? HEADINGS_DIAGRAM : HEADINGS}
            rows={rows}
            selectedRowKey={selectedPart}
            setSelectedRowKey={(key) =>
                setSelectedPart(key as string | number | undefined)
            }
        />
    );
};
