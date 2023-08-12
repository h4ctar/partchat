import { useAuth } from "react-oidc-context";
import { Link } from "wouter";
import { Loading } from "../Loading";
import { PencilIcon } from "../icons/PencilIcon";
import { TrashIcon } from "../icons/TrashIcon";
import { ErrorMessage } from "../ui/ErrorMessage";
import { RowData, Table } from "../ui/Table";
import { useDeleteMotorcycle, useFetchMotorcycle } from "./motorcycle.hook";

type Props = {
    motorcycleId: string;
};

export const MotorcycleDetails = ({ motorcycleId }: Props) => {
    const { isAuthenticated } = useAuth();

    const fetchMotorcycle = useFetchMotorcycle(motorcycleId);
    const deleteMotorcycle = useDeleteMotorcycle(motorcycleId);

    if (fetchMotorcycle.isLoading) {
        return <Loading />;
    }

    if (fetchMotorcycle.isError) {
        return (
            <div className="mx-auto max-w-7xl p-5">
                <ErrorMessage error={fetchMotorcycle.error} />
            </div>
        );
    }

    const motorcycle = fetchMotorcycle.data;

    // TODO: memoize this
    const rows = [
        ["Engine type", motorcycle.engineType],
        ["Displacement", `${motorcycle.displacement.toFixed(1)} cc`],
        ["Valves per cylinder", motorcycle.valvesPerCylinder],
        ["Power", `${motorcycle.power.toFixed(1)} kW`],
        ["Compression", `${motorcycle.compression.toFixed(1)}:1`],
        ["Top Speed", `${motorcycle.topSpeed.toFixed(1)} km/h`],
        ["Weight", `${motorcycle.weight.toFixed(1)} kg`],
    ].map((row, index) => [index, row] as RowData);

    const onDeleteClick = () => {
        if (
            confirm(
                `Are you sure you want to delete ${motorcycle.make} ${motorcycle.model}?`,
            )
        ) {
            deleteMotorcycle.mutate();
        }
    };

    return (
        <div className="mx-auto flex max-w-7xl flex-col items-center p-5">
            <div className="flex w-full flex-row">
                <div className="flex-grow">
                    <h1 className="mx-5 mt-5 text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">{`${motorcycle.make} ${motorcycle.model}`}</h1>
                    <h2 className="mx-5 mb-5 text-2xl text-slate-500">
                        {`${motorcycle.yearFrom}-${motorcycle.yearTo}`}
                    </h2>
                </div>
                {/* TODO: check if they have the edit:motorcycle scope */}
                {isAuthenticated && (
                    <div className="flex flex-row items-center gap-4">
                        <button onClick={onDeleteClick} aria-label="delete">
                            <TrashIcon />
                        </button>
                        <Link href={`/motorcycles/${motorcycleId}/edit`}>
                            <a aria-label="edit">
                                <PencilIcon />
                            </a>
                        </Link>
                    </div>
                )}
            </div>
            <div className="flex w-full flex-col items-stretch gap-4 lg:flex-row">
                <img
                    className="rounded-lg shadow-xl ring-1 ring-slate-900/5"
                    src={`/public/motorcycles/${motorcycle.id}.png`}
                />
                <div className="w-full">
                    <Table rows={rows} />
                </div>
            </div>
        </div>
    );
};
