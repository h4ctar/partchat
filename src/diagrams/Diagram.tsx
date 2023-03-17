import { useDiagram } from "../motorcycles/motorcycle.hook";

type Params = {
    motorcycleId: string;
    diagramId: string;
};

export const Diagram = ({ motorcycleId, diagramId }: Params) => {
    const { query } = useDiagram(motorcycleId, diagramId);

    if (!query.data) {
        return (
            <div className="p-5">
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <div className="p-5">
            <h1>{`${query.data.name}`}</h1>
        </div>
    );
};
