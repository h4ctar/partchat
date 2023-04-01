import { CommentsList } from "./CommentsList";
import { PostComment } from "./PostComment";

type Props = {
    motorcycleId?: string;
    diagramId?: string;
    partId?: string;
};

export const Comments = ({ motorcycleId, diagramId, partId }: Props) => {
    return (
        <div className="mx-auto flex max-w-7xl flex-col gap-4 p-5">
            <PostComment
                motorcycleId={motorcycleId}
                diagramId={diagramId}
                partId={partId}
            />
            <CommentsList
                motorcycleId={motorcycleId}
                diagramId={diagramId}
                partId={partId}
            />
        </div>
    );
};
