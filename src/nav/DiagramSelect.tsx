import { useLocation } from "wouter";
import { useDiagrams } from "../diagrams/diagram.hooks";

type Props = {
    motorcycleId: string;
    diagramId?: string;
};

export const DiagramSelect = ({ motorcycleId, diagramId }: Props) => {
    const [, setLocation] = useLocation();
    const { query } = useDiagrams(motorcycleId);

    return (
        <select
            name="diagram"
            id="diagram"
            className="rounded-lg border-gray-300 dark:border-slate-50/10 dark:bg-slate-400/10"
            value={diagramId || ""}
            onChange={(event) =>
                setLocation(
                    `/motorcycles/${motorcycleId}/diagrams/${event.target.value}`,
                )
            }
            disabled={query.isLoading}
        >
            <option value="" disabled>
                {query.isLoading ? "Loading..." : "Select diagram"}
            </option>
            {query.data?.map((diagram) => (
                <option key={diagram.id} value={diagram.id}>
                    {diagram.name}
                </option>
            ))}
        </select>
    );
};
