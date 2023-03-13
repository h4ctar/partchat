import { useLocation } from "wouter";
import { useMotorcycles } from "../motorcycles/motorcycle.hook";

type Params = {
    make: string;
    year: number;
    model?: string;
};

export const ModelSelect = ({ make, year, model }: Params) => {
    const [, setLocation] = useLocation();
    const { query } = useMotorcycles(make, year);

    return (
        <select
            name="model"
            id="model"
            className="border-gray-300 rounded-lg dark:bg-slate-400/10 dark:border-slate-50/10"
            value={model || ""}
            onChange={(event) =>
                setLocation(`/motorcycles/${event.target.value}`)
            }
            disabled={query.isLoading}
        >
            <option value="" disabled>
                {query.isLoading ? "Loading..." : "Select model"}
            </option>
            {query.data?.map((motorcycles) => (
                <option key={motorcycles.id} value={motorcycles.id}>
                    {motorcycles.model}
                </option>
            ))}
        </select>
    );
};
