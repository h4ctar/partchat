import { useLocation } from "wouter";
import { useConfig } from "../motorcycles/motorcycle.hook";

type Props = {
    make: string;
    year: number;
    model?: string;
};

export const ModelSelect = ({ make, year, model }: Props) => {
    const [, setLocation] = useLocation();
    const { query } = useConfig();

    const models = Object.entries(query.data?.[make]?.[year] || {});

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
            {models.map((model) => (
                <option key={model[0]} value={model[1]}>
                    {model[0]}
                </option>
            ))}
        </select>
    );
};
