import { Comments } from "../comments/Comments";
import { Diagrams } from "../diagrams/Diagrams";
import { MotorcycleDetails } from "./MotorcycleDetails";

type Props = {
    motorcycleId: string;
};

const Motorcycle = ({ motorcycleId }: Props) => {
    return (
        <>
            <MotorcycleDetails motorcycleId={motorcycleId} />
            <Diagrams motorcycleId={motorcycleId} />
            <Comments motorcycleId={motorcycleId} />
        </>
    );
};

export default Motorcycle;
