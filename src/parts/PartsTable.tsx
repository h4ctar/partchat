import { useMemo } from "react";
import { Loading } from "../Loading";
import { RowData, Table } from "../ui/Table";
import { useParts } from "./part.hook";
import { ErrorMessage } from "../ui/ErrorMessage";

type Props = {
    diagramId: string;
    selectedRefNo?: number;
    setSelectedRefNo: (selectedRefNo?: number) => void;
};

const HEADINGS = ["REF NO", "PART NO", "DESCRIPTION", "QTY"];

export const PartsTable = ({
    diagramId,
    selectedRefNo,
    setSelectedRefNo,
}: Props) => {
    const { query } = useParts(diagramId);

    const rows = useMemo(
        () =>
            query.data?.map(
                (part) =>
                    [
                        part.refNo,
                        [
                            part.refNo,
                            part.partNumber,
                            part.description,
                            part.qty,
                        ],
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
            headings={HEADINGS}
            rows={rows}
            selectedRowKey={selectedRefNo}
            setSelectedRowKey={(key) => setSelectedRefNo(key as number)}
        />
    );
};
