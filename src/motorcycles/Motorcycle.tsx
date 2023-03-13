import { useMotorcycle } from "./motorcycle.hook";

type Params = {
    motorcycleId: string;
};

export const Motorcycle = ({ motorcycleId }: Params) => {
    const { query } = useMotorcycle(motorcycleId);

    if (!query.data) {
        return (
            <div className="p-5">
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <div className="p-5">
            <h1>{`${query.data.make} ${query.data.model}`}</h1>
        </div>
    );
};
