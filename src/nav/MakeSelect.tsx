import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { fetchMakes } from "../api";

type Params = {
    make?: string;
};

export const MakeSelect = ({ make }: Params) => {
    const [, setLocation] = useLocation();

    const query = useQuery({
        queryKey: ["makes"],
        queryFn: fetchMakes,
    });

    return (
        <select
            name="make"
            id="make"
            className="border-gray-300 rounded-lg dark:bg-slate-400/10 dark:border-slate-50/10"
            value={make || ""}
            onChange={(event) =>
                setLocation(`/motorcycles?make=${event.target.value}`)
            }
            disabled={query.isLoading}
        >
            <option value="" disabled>
                {query.isLoading ? "Loading..." : "Select year"}
            </option>
            {query.data?.map((make) => (
                <option key={make}>{make}</option>
            ))}
        </select>
    );
};
