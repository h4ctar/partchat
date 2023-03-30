import { useState } from "react";
import { Comments } from "../comments/Comments";
import { Parts } from "../parts/Parts";
import { useDiagram } from "./diagram.hooks";
import { PartHotspots } from "./PartHotspots";

type Params = {
    diagramId: string;
};

export const Diagram = ({ diagramId }: Params) => {
    const { query } = useDiagram(diagramId);
    const [selectedRefNo, setSelectedRefNo] = useState<number>();

    if (!query.data) {
        return (
            <div className="p-5 max-w-7xl mx-auto">
                <h1>Loading...</h1>
            </div>
        );
    }

    const diagram = query.data;

    return (
        <div>
            <div className="p-5 gap-5 flex lg:flex-row flex-col lg:h-[calc(100vh-42px-20px-20px)] items-stretch lg:justify-center">
                <div className="h-full relative">
                    <img src={diagram.image} className="h-full" />
                    <PartHotspots
                        diagram={diagram}
                        selectedRefNo={selectedRefNo}
                    />
                </div>
                <div className="overflow-auto flex-shrink-0">
                    <Parts
                        diagramId={diagramId}
                        setSelectedRefNo={setSelectedRefNo}
                    />
                </div>
            </div>
            <Comments diagramId={diagramId} />
        </div>
    );
};
