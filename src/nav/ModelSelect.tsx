import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { fetchModels } from "../api";
import { Spinner } from "../Spinner";

type Params = {
    make: string;
    year: number;
    model?: string;
};

export const ModelSelect = ({ make, year, model }: Params) => {
    const [, setLocation] = useLocation();

    const query = useQuery({
        queryKey: ["makes", make, "years", year, "models"],
        queryFn: fetchModels(make, year),
    });

    if (query.isLoading) {
        return <Spinner />;
    }

    return (
        <select
            name="model"
            id="model"
            className="border-gray-300 rounded-lg shadow-sm"
            value={model || ""}
            onChange={(event) =>
                setLocation(
                    `/makes/${make}/years/${year}/models/${event.target.value}`
                )
            }
            disabled={query.isLoading}
        >
            <option value="" disabled>
                Select model
            </option>
            {query.data?.map((model) => (
                <option key={model}>{model}</option>
            ))}
        </select>
    );
};
