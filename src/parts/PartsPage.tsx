import { useState } from "react";
import { PartsTable } from "./PartsTable";

const PartsPage = () => {
    const [selectedPartNumber, setSelectedPartNumber] = useState<string>();

    return (
        <div className="mx-auto max-w-7xl p-5">
            <PartsTable
                selectedPart={selectedPartNumber}
                setSelectedPart={(key) => setSelectedPartNumber(key as string)}
            />
        </div>
    );
};

export default PartsPage;
