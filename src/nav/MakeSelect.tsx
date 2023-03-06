import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";

const fetchMakes = async () => {
    const response = await fetch("/api/makes");
    const makes: string[] = await response.json();
    return makes;
};

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
            className="border-gray-300 rounded-lg shadow-sm"
            value={make}
            onChange={(event) => setLocation(`/makes/${event.target.value}`)}
        >
            {query.isLoading ? (
                <option>Loading...</option>
            ) : query.error ? (
                <></>
            ) : (
                <>
                    <option>Select make</option>
                    {query.data?.map((make) => (
                        <option key={make}>{make}</option>
                    ))}
                </>
            )}
        </select>
    );
};
