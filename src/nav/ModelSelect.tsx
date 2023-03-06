import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";

const fetchModels = (make: string, year: number) => async () => {
    const response = await fetch(`/api/makes/${make}/years/${year}/models`);
    const models: string[] = await response.json();
    return models;
};

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

    return (
        <select
            name="model"
            id="model"
            className="border-gray-300 rounded-lg shadow-sm"
            value={model}
            onChange={(event) =>
                setLocation(
                    `/makes/${make}/years/${year}/models/${event.target.value}`
                )
            }
        >
            {query.isLoading ? (
                <option>Loading...</option>
            ) : (
                <>
                    <option>Select model</option>
                    {query.data?.map((model) => (
                        <option key={model}>{model}</option>
                    ))}
                </>
            )}
        </select>
    );
};
