import { useState } from "react";
import { Loading } from "../Loading";
import { Comments } from "../comments/Comments";
import { PartsTable } from "../parts/PartsTable";
import { ErrorMessage } from "../ui/ErrorMessage";
import { PartHotspots } from "./PartHotspots";
import { useDiagram } from "./diagram.hooks";

type Props = {
    diagramId: string;
};

const Diagram = ({ diagramId }: Props) => {
    const { query } = useDiagram(diagramId);
    const [selectedRefNo, setSelectedRefNo] = useState<number>();

    if (query.isLoading) {
        return <Loading />;
    }

    if (query.isError) {
        return (
            <div className="mx-auto max-w-7xl p-5">
                <ErrorMessage error={query.error} />
            </div>
        );
    }

    const diagram = query.data;

    return (
        <div>
            <div className="flex flex-col items-stretch gap-4 p-5 lg:h-[calc(100vh-42px-20px-20px)] lg:flex-row lg:justify-center">
                <div className="relative h-full">
                    <img
                        src={diagram.image}
                        className="h-full rounded-lg shadow-xl ring-1 ring-slate-900/5"
                    />
                    <PartHotspots
                        diagram={diagram}
                        selectedRefNo={selectedRefNo}
                        setSelectedRefNo={setSelectedRefNo}
                    />
                </div>
                <div className="max-h-full flex-shrink-0 overflow-auto">
                    <PartsTable
                        diagramId={diagramId}
                        selectedPart={selectedRefNo}
                        setSelectedPart={(key) =>
                            setSelectedRefNo(key as number)
                        }
                    />
                </div>
            </div>
            <Comments diagramId={diagramId} />
        </div>
    );
};

export default Diagram;
