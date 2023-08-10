import { zodResolver } from "@hookform/resolvers/zod";
import { PostDiagram } from "@partchat/types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../ui/ErrorMessage";
import { fetchDiagram } from "./diagram.api";
import { useCreateDiagram, useUpdateDiagram } from "./diagram.hooks";
import { TextInput } from "../ui/TextInput";
import { PictureInput } from "../ui/PictureInput";

type Props = {
    motorcycleId: string;
    diagramId?: string;
};

export const DiagramForm = ({ motorcycleId, diagramId }: Props) => {
    const createDiagram = useCreateDiagram(motorcycleId);
    const updateDiagram = useUpdateDiagram(motorcycleId);

    const [image, setImage] = useState<File>();
    const form = useForm<PostDiagram>({
        resolver: zodResolver(PostDiagram),
    });

    useEffect(() => {
        if (diagramId) {
            fetchDiagram(diagramId)().then((diagram) =>
                form.reset({ motorcycleId, ...diagram }),
            );
            // TODO: catch error
        } else {
            form.reset({ motorcycleId });
        }
    }, [diagramId]);

    return (
        <div className="mx-auto flex max-w-7xl flex-col gap-4 p-5">
            {updateDiagram.isError && (
                <ErrorMessage error={updateDiagram.error} />
            )}
            {createDiagram.isError && (
                <ErrorMessage error={createDiagram.error} />
            )}
            <form
                onSubmit={form.handleSubmit((postDiagram) =>
                    diagramId
                        ? updateDiagram.mutate({
                              diagramId,
                              postDiagram,
                              image,
                          })
                        : createDiagram.mutate({ postDiagram, image }),
                )}
                className="flex flex-col gap-4"
            >
                <TextInput
                    label="Name"
                    name="name"
                    form={form}
                    className="col-span-2 sm:col-span-1"
                />
                <PictureInput
                    image={image}
                    setImage={setImage}
                    defaultImage={
                        diagramId && `/public/diagrams/${diagramId}.png`
                    }
                />
                <input
                    className="dark:highlight-white/20 rounded-lg bg-slate-900 px-6 py-2 text-center font-semibold text-white hover:bg-slate-700 focus:outline-none dark:bg-sky-500 dark:hover:bg-sky-400"
                    type="submit"
                    value={diagramId ? "Update diagram" : "Add diagram"}
                />
            </form>
        </div>
    );
};
