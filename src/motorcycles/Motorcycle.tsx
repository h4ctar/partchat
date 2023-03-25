import { Diagrams } from "../diagrams/Diagrams";
import { useMotorcycle } from "./motorcycle.hook";

type Params = {
    motorcycleId: string;
};

export const Motorcycle = ({ motorcycleId }: Params) => {
    const { query: queryMotorcycle } = useMotorcycle(motorcycleId);

    if (!queryMotorcycle.data) {
        return (
            <div className="p-5">
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <>
            <div className="p-5 flex flex-col items-center">
                <h1 className="font-bold text-2xl mb-4">{`${queryMotorcycle.data.make} ${queryMotorcycle.data.model} ${queryMotorcycle.data.yearFrom}-${queryMotorcycle.data.yearTo}`}</h1>
                <div className="flex flex-col lg:flex-row gap-5 items-center">
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
        </>
    );
};
