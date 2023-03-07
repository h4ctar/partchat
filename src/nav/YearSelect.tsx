import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { fetchYears } from "../api";
import { Spinner } from "../Spinner";

type Params = {
    make: string;
    year?: number;
};

export const YearSelect = ({ make, year }: Params) => {
    const [, setLocation] = useLocation();

    const query = useQuery({
        queryKey: ["makes", make, "years"],
        queryFn: fetchYears(make),
    });

    if (query.isLoading) {
        return <Spinner />;
    }

    return (
        <select
            name="year"
            id="year"
            className="border-gray-300 rounded-lg shadow-sm"
            value={year || ""}
            onChange={(event) =>
                setLocation(`/makes/${make}/years/${event.target.value}`)
            }
            disabled={query.isLoading}
        >
            <option value="" disabled>
                Select year
            </option>
            {query.data?.map((year) => (
                <option key={year}>{year}</option>
            ))}
        </select>
    );
};
