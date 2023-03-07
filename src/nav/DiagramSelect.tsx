import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { fetchDiagrams } from "../api";
import { Spinner } from "../Spinner";

type Params = {
    make: string;
    year: number;
    model: string;
    diagram?: string;
};

export const DiagramSelect = ({ make, year, model, diagram }: Params) => {
    const [, setLocation] = useLocation();

    const query = useQuery({
        queryKey: ["makes", make, "years", year, "models", model, "diagrams"],
        queryFn: fetchDiagrams(make, year, model),
    });

    if (query.isLoading) {
        return <Spinner />;
    }

    return (
        <select
            name="diagram"
            id="diagram"
            className="border-gray-300 rounded-lg shadow-sm"
            value={diagram || ""}
            onChange={(event) =>
                setLocation(
                    `/makes/${make}/years/${year}/models/${model}/diagrams/${event.target.value}`
                )
            }
            disabled={query.isLoading}
        >
            <option value="" disabled>
                Select diagram
            </option>
            {query.data?.map((diagram) => (
                <option key={diagram.name}>{diagram.name}</option>
            ))}
        </select>
    );
};
