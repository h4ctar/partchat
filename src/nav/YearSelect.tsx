import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";

const fetchYears = (make: string) => async () => {
    const response = await fetch(`/api/makes/${make}/years`);
    const years: number[] = await response.json();
    return years;
};

type Params = {
    make: string;
    year?: number;
};

export const YearSelect = ({ make, year }: Params) => {
    const [, setLocation] = useLocation();

    const query = useQuery({
        queryKey: ["makes", make],
        queryFn: fetchYears(make),
    });

    return (
        <select
            name="year"
            id="year"
            className="border-gray-300 rounded-lg shadow-sm"
            defaultValue=""
            value={year}
            onChange={(event) =>
                setLocation(`/makes/${make}/years/${event.target.value}`)
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
