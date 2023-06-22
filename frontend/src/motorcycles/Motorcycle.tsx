import { Comments } from "../comments/Comments";
import { DiagramCards } from "../diagrams/DiagramCards";
import { MotorcycleDetails } from "./MotorcycleDetails";

type Props = {
    motorcycleId: string;
};

const Motorcycle = ({ motorcycleId }: Props) => {
    return (
        <>
            <MotorcycleDetails motorcycleId={motorcycleId} />
            <DiagramCards motorcycleId={motorcycleId} />
            <Comments motorcycleId={motorcycleId} />
        </>
    );
};

export default Motorcycle;
