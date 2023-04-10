import { useMemo } from "react";
import { Loading } from "../Loading";
import { Table } from "../ui/Table";
import { useParts } from "./part.hook";

type Props = {
    diagramId: string;
    setSelectedRefNo: (selectedRefNo?: number) => void;
};

const HEADINGS = ["REF NO", "PART NO", "DESCRIPTION", "QTY"];

export const PartsTable = ({ diagramId, setSelectedRefNo }: Props) => {
    const { query } = useParts(diagramId);

    const rows = useMemo(
        () =>
            query.data?.map((part) => [
                part.refNo,
                part.partNumber,
                part.description,
                part.qty,
            ]) || [],
        [query.data],
    );

    if (!query.data) {
        return <Loading />;
    }

    return <Table headings={HEADINGS} rows={rows} />;
};
