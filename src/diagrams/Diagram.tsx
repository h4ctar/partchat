import { useState } from "react";
import { Comments } from "../comments/Comments";
import { PartsTable } from "../parts/PartsTable";
import { useDiagram } from "./diagram.hooks";
import { PartHotspots } from "./PartHotspots";

type Props = {
    diagramId: string;
};

export const Diagram = ({ diagramId }: Props) => {
    const { query } = useDiagram(diagramId);
    const [selectedRefNo, setSelectedRefNo] = useState<number>();

    if (!query.data) {
        return (
            <div className="mx-auto max-w-7xl p-5">
                <h1>Loading...</h1>
            </div>
        );
    }

    const diagram = query.data;

    return (
        <div>
            <div className="flex flex-col items-stretch gap-5 p-5 lg:h-[calc(100vh-42px-20px-20px)] lg:flex-row lg:justify-center">
                <div className="relative h-full">
                    <img src={diagram.image} className="h-full" />
                    <PartHotspots
                        diagram={diagram}
                        selectedRefNo={selectedRefNo}
                    />
                </div>
                <div className="flex-shrink-0 overflow-auto">
                    <PartsTable
                        diagramId={diagramId}
                        setSelectedRefNo={setSelectedRefNo}
                    />
                </div>
            </div>
            <Comments diagramId={diagramId} />
        </div>
    );
};
