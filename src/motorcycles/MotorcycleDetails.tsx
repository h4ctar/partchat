import { Spinner } from "../icons/Spinner";
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
                <img className="rounded-lg" src={motorcycle.image} />
                <table className="w-full">
                    <tbody className="bg-white dark:bg-slate-800">
                        <tr>
                            <td className="my-td">Capacity</td>
                            <td className="my-td">653 cc</td>
                        </tr>
                        <tr>
                            <td className="my-td">Bore x Stroke</td>
                            <td className="my-td">63 x 52.4 mm</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
