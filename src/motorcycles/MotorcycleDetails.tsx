import { Spinner } from "../icons/Spinner";
import { Table } from "../ui/Table";
import { useMotorcycle } from "./motorcycle.hook";

type Props = {
    motorcycleId: string;
};

export const MotorcycleDetails = ({ motorcycleId }: Props) => {
    const { query } = useMotorcycle(motorcycleId);

    if (!query.data) {
        return (
            <div className="mx-auto max-w-7xl p-5">
                <Spinner />
            </div>
        );
    }

    const motorcycle = query.data;

    return (
        <div className="flex flex-col items-center p-5">
            <h1 className="m-5 text-center text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">{`${motorcycle.make} ${motorcycle.model} ${motorcycle.yearFrom}-${motorcycle.yearTo}`}</h1>
            <div className="flex flex-col items-center gap-5 lg:flex-row">
                <img
                    className="rounded-lg shadow-xl ring-1 ring-slate-900/5"
                    src={motorcycle.image}
                />
                <Table rows={[["Hello", "World"]]} />
            </div>
        </div>
    );
};
