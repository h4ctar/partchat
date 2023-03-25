import { Parts } from "../parts/Parts";
import { useDiagram } from "./diagram.hooks";

type Params = {
    diagramId: string;
};

export const Diagram = ({ diagramId }: Params) => {
    const { query } = useDiagram(diagramId);

    if (!query.data) {
        return (
            <div className="p-5">
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <div className="p-5 gap-5 flex lg:flex-row flex-col lg:max-h-[calc(100vh-42px-20px-20px)] items-stretch">
            <div className="lg:flex-grow">
                <img
                    src={query.data.image}
                    className="max-h-full max-w-full m-auto"
                />
            </div>
            <div className="overflow-auto flex-shrink-0">
                <Parts diagramId={diagramId} />
            </div>
        </div>
    );
};
