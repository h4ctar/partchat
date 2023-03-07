export const fetchMakes = async () => {
    const response = await fetch("/api/makes");
    const makes: string[] = await response.json();
    return makes;
};

export const fetchYears = (make: string) => async () => {
    const response = await fetch(`/api/makes/${make}/years`);
    const years: number[] = await response.json();
    return years;
};

export const fetchModels = (make: string, year: number) => async () => {
    const response = await fetch(`/api/makes/${make}/years/${year}/models`);
    const models: string[] = await response.json();
    return models;
};

export const fetchDiagrams =
    (make: string, year: number, model: string) => async () => {
        const response = await fetch(
            `/api/makes/${make}/years/${year}/models/${model}/diagrams`
        );
        const diagrams: { name: string }[] = await response.json();
        return diagrams;
    };
