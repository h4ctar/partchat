import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { fetchYears } from "../api";

type Params = {
    make: string;
    year?: number;
};

export const YearSelect = ({ make, year }: Params) => {
    const [, setLocation] = useLocation();

    const query = useQuery({
        queryKey: ["makes", make, "years"],
        queryFn: fetchYears(make!),
    });

    return (
        <select
            name="year"
            id="year"
            className="border-gray-300 rounded-lg dark:bg-slate-400/10 dark:border-slate-50/10"
            value={year || ""}
            onChange={(event) =>
                setLocation(
                    `/motorcycles?make=${make}&year=${event.target.value}`
                )
            }
            disabled={query.isLoading}
        >
            <option value="" disabled>
                {query.isLoading ? "Loading..." : "Select year"}
            </option>
            {query.data?.map((year) => (
                <option key={year}>{year}</option>
            ))}
        </select>
    );
};
