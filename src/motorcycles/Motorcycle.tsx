import { Comments } from "../comments/Comments";
import { Diagrams } from "../diagrams/Diagrams";
import { useMotorcycle } from "./motorcycle.hook";

type Props = {
    motorcycleId: string;
};

export const Motorcycle = ({ motorcycleId }: Props) => {
    const { query: queryMotorcycle } = useMotorcycle(motorcycleId);

    if (!queryMotorcycle.data) {
        return (
            <div className="mx-auto max-w-7xl p-5">
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-col items-center p-5">
                <h1 className="m-5 text-center text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">{`${queryMotorcycle.data.make} ${queryMotorcycle.data.model} ${queryMotorcycle.data.yearFrom}-${queryMotorcycle.data.yearTo}`}</h1>
                <div className="flex flex-col items-center gap-5 lg:flex-row">
                    <img
                        className="rounded-lg"
                        src={queryMotorcycle.data.image}
                    />
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
            <Diagrams motorcycleId={motorcycleId} />
            <Comments motorcycleId={motorcycleId} />
        </>
    );
};
