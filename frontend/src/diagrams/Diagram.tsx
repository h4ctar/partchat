import { useState } from "react";
import { Loading } from "../Loading";
import { Comments } from "../comments/Comments";
import { PartsTable } from "../parts/PartsTable";
import { ErrorMessage } from "../ui/ErrorMessage";
import { PartHotspots } from "./PartHotspots";
import { useDeleteDiagram, useFetchDiagram } from "./diagram.hooks";
import { useAuth0 } from "@auth0/auth0-react";
import { TrashIcon } from "../icons/TrashIcon";
import { Link } from "wouter";
import { PencilIcon } from "../icons/PencilIcon";

type Props = {
    motorcycleId: string;
    diagramId: string;
};

const Diagram = ({ motorcycleId, diagramId }: Props) => {
    const fetchDiagram = useFetchDiagram(diagramId);
    const deleteDiagram = useDeleteDiagram(motorcycleId, diagramId);
    const [selectedRefNo, setSelectedRefNo] = useState<number>();
    const { isAuthenticated } = useAuth0();

    if (fetchDiagram.isLoading) {
        return <Loading />;
    }

    if (fetchDiagram.isError) {
        return (
            <div className="mx-auto max-w-7xl p-5">
                <ErrorMessage error={fetchDiagram.error} />
            </div>
        );
    }

    const diagram = fetchDiagram.data;

    const onDeleteClick = () => {
        if (confirm(`Are you sure you want to delete ${diagram.name}?`)) {
            deleteDiagram.mutate();
        }
    };

    return (
        <div>
            <div className="flex flex-col items-stretch gap-4 p-5 lg:h-[calc(100vh-42px-20px-20px)] lg:flex-row lg:justify-center">
                <div className="relative h-full">
                    <img
                        src={`/public/diagrams/${diagram.id}.png`}
                        className="h-full rounded-lg shadow-xl ring-1 ring-slate-900/5"
                    />
                    <PartHotspots
                        diagram={diagram}
                        selectedRefNo={selectedRefNo}
                        setSelectedRefNo={setSelectedRefNo}
                    />
                </div>
                <div className="flex h-full flex-col">
                    <div className="mb-4 flex w-full flex-row">
                        <div className="flex-grow">
                            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
                                {diagram.name}
                            </h1>
                        </div>
                        {/* TODO: check if they have the edit:diagram scope */}
                        {isAuthenticated && (
                            <div className="flex flex-row items-center gap-4">
                                <button
                                    onClick={onDeleteClick}
                                    aria-label="delete"
                                >
                                    <TrashIcon />
                                </button>
                                <Link
                                    href={`/motorcycles/${motorcycleId}/diagrams/${diagramId}/edit`}
                                >
                                    <a aria-label="edit">
                                        <PencilIcon />
                                    </a>
                                </Link>
                            </div>
                        )}
                    </div>
                    <PartsTable
                        diagramId={diagramId}
                        selectedPart={selectedRefNo}
                        setSelectedPart={(key) =>
                            setSelectedRefNo(key as number)
                        }
                    />
                </div>
            </div>
            <Comments diagramId={diagramId} />
        </div>
    );
};

export default Diagram;
