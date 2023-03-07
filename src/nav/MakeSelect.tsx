import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { fetchMakes } from "../api";
import { Spinner } from "../Spinner";

type Params = {
    make?: string;
};

export const MakeSelect = ({ make }: Params) => {
    const [, setLocation] = useLocation();

    const query = useQuery({
        queryKey: ["makes"],
        queryFn: fetchMakes,
    });

    if (query.isLoading) {
        return <Spinner />;
    }

    return (
        <select
            name="make"
            id="make"
            className="border-gray-300 rounded-lg shadow-sm"
            value={make || ""}
            onChange={(event) => setLocation(`/makes/${event.target.value}`)}
            disabled={query.isLoading}
        >
            <option value="" disabled>
                Select make
            </option>
            {query.data?.map((make) => (
                <option key={make}>{make}</option>
            ))}
        </select>
    );
};
