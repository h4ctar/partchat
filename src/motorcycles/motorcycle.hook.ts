import { useQuery } from "@tanstack/react-query";

type Motorcycle = {
    id: string;
    make: string;
    yearFrom: number;
    yearTo: number;
    model: string;
};

const fetchMakes = async () => {
    const response = await fetch("/api/makes");
    const makes: string[] = await response.json();
    return makes;
};

const fetchYears = (make: string) => async () => {
    const response = await fetch(`/api/makes/${make}/years`);
    const years: number[] = await response.json();
    return years;
};

const fetchMotorcycle = (motorcycleId: string) => async () => {
    const response = await fetch(`/api/motorcycles/${motorcycleId}`);
    const motorcycles: Motorcycle = await response.json();
    return motorcycles;
};

const fetchMotorcycles = (make?: string, year?: number) => async () => {
    const search = new URLSearchParams();
    if (make) {
        search.append("make", make);
    }
    if (year) {
        search.append("year", year.toFixed());
    }
    const response = await fetch(`/api/motorcycles?${search.toString()}`);
    const motorcycles: Motorcycle[] = await response.json();
    return motorcycles;
};

export const useMakes = () => {
    const query = useQuery({
        queryKey: ["makes"],
        queryFn: fetchMakes,
    });

    return { query };
};

export const useYears = (make: string) => {
    const query = useQuery({
        queryKey: ["makes", make, "years"],
        queryFn: fetchYears(make),
    });

    return { query };
};

export const useMotorcycle = (motorcycleId: string) => {
    const query = useQuery({
        queryKey: ["motorcycle", motorcycleId],
        queryFn: fetchMotorcycle(motorcycleId),
    });

    return {
        query,
    };
};

export const useMotorcycles = (make?: string, year?: number) => {
    const query = useQuery({
        queryKey: ["motorcycles", make, year],
        queryFn: fetchMotorcycles(make, year),
        keepPreviousData: true,
    });

    return {
        query,
    };
};
