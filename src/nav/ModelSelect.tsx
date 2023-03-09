import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { fetchModels } from "../api";

type Params = {
    make: string;
    year: number;
    model?: string;
};

export const ModelSelect = ({ make, year, model }: Params) => {
    const [, setLocation] = useLocation();

    const query = useQuery({
        queryKey: ["makes", make, "years", year, "models"],
        queryFn: fetchModels(make!, Number(year!)),
    });

    return (
        <select
            name="model"
            id="model"
            className="border-gray-300 rounded-lg dark:bg-slate-400/10 dark:border-slate-50/10"
            value={model || ""}
            onChange={(event) =>
                setLocation(
                    `/motorcycles?make=${make}&year=${year}&model=${event.target.value}`
                )
            }
            disabled={query.isLoading}
        >
            <option value="" disabled>
                {query.isLoading ? "Loading..." : "Select year"}
            </option>
            {query.data?.map((model) => (
                <option key={model}>{model}</option>
            ))}
        </select>
    );
};
