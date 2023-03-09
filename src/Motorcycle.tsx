type Params = {
    motorcycleId: string;
};

export const Motorcycle = ({ motorcycleId }: Params) => {
    return (
        <div className="p-5">
            <h1>{motorcycleId}</h1>
        </div>
    );
};
