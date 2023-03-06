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
            value={year}
            onChange={(event) =>
                setLocation(`/makes/${make}/years/${event.target.value}`)
            }
        >
            {query.isLoading ? (
                <option>Loading...</option>
            ) : (
                <>
                    <option>Select year</option>
                    {query.data?.map((year) => (
                        <option key={year}>{year}</option>
                    ))}
                </>
            )}
        </select>
    );
};
