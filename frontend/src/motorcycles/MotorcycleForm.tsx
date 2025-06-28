import { zodResolver } from "@hookform/resolvers/zod";
import { PostMotorcycle } from "@partchat/types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PictureInput } from "../ui/PictureInput";
import { TextInput } from "../ui/TextInput";
import { fetchMotorcycle } from "./motorcycle.api";
import { useCreateMotorcycle, useUpdateMotorcycle } from "./motorcycle.hook";
import { ErrorMessage } from "../ui/ErrorMessage";

type Props = { motorcycleId?: string };

export const MotorcycleForm = ({ motorcycleId }: Props) => {
    const createMotorcycle = useCreateMotorcycle();
    const updateMotorcycle = useUpdateMotorcycle();

    const [image, setImage] = useState<File>();
    const form = useForm({ resolver: zodResolver(PostMotorcycle) });

    useEffect(() => {
        if (motorcycleId) {
            fetchMotorcycle(motorcycleId)().then((motorcycle) =>
                form.reset(motorcycle),
            );
            // TODO: catch error
        } else {
            form.reset();
        }
    }, [motorcycleId]);

    return (
        <div className="mx-auto flex max-w-7xl flex-col gap-4 p-5">
            {updateMotorcycle.isError && (
                <ErrorMessage error={updateMotorcycle.error} />
            )}
            {createMotorcycle.isError && (
                <ErrorMessage error={createMotorcycle.error} />
            )}
            <form
                onSubmit={form.handleSubmit((postMotorcycle) =>
                    motorcycleId
                        ? updateMotorcycle.mutate({
                              motorcycleId,
                              postMotorcycle,
                              image,
                          })
                        : createMotorcycle.mutate({ postMotorcycle, image }),
                )}
                className="flex flex-col gap-4"
            >
                <div className="grid grid-cols-2 gap-4">
                    <TextInput
                        label="Make"
                        name="make"
                        form={form}
                        className="col-span-2 sm:col-span-1"
                    />
                    <TextInput
                        label="Model"
                        name="model"
                        form={form}
                        className="col-span-2 sm:col-span-1"
                    />
                    <TextInput
                        label="Year from"
                        name="yearFrom"
                        type="number"
                        form={form}
                        className="col-span-2 sm:col-span-1"
                    />
                    <TextInput
                        label="Year to"
                        name="yearTo"
                        type="number"
                        form={form}
                        className="col-span-2 sm:col-span-1"
                    />
                </div>
                <PictureInput
                    image={image}
                    setImage={setImage}
                    defaultImage={
                        motorcycleId &&
                        `/public/motorcycles/${motorcycleId}.png`
                    }
                />
                <div className="grid grid-cols-4 gap-4">
                    <TextInput
                        label="Engine Type"
                        name="engineType"
                        form={form}
                        className="col-span-4"
                    />
                    <TextInput
                        label="Displacement"
                        units="ccm"
                        name="displacement"
                        type="number"
                        form={form}
                        className="col-span-4 sm:col-span-2 md:col-span-1"
                    />
                    <TextInput
                        label="Valves per cylinder"
                        name="valvesPerCylinder"
                        type="number"
                        form={form}
                        className="col-span-4 sm:col-span-2 md:col-span-1"
                    />
                    <TextInput
                        label="Power"
                        units="kW"
                        name="power"
                        type="number"
                        form={form}
                        className="col-span-4 sm:col-span-2 md:col-span-1"
                    />
                    <TextInput
                        label="Compression"
                        units=":1"
                        name="compression"
                        type="number"
                        form={form}
                        className="col-span-4 sm:col-span-2 md:col-span-1"
                    />
                    <TextInput
                        label="Top Speed"
                        units="km/h"
                        name="topSpeed"
                        type="number"
                        form={form}
                        className="col-span-4 sm:col-span-2"
                    />
                    <TextInput
                        label="Weight"
                        units="kg"
                        name="weight"
                        type="number"
                        form={form}
                        className="col-span-4 sm:col-span-2"
                    />
                </div>

                <input
                    className="dark:highlight-white/20 rounded-lg bg-slate-900 px-6 py-2 text-center font-semibold text-white hover:bg-slate-700 focus:outline-none dark:bg-sky-500 dark:hover:bg-sky-400"
                    type="submit"
                    value={
                        motorcycleId ? "Update motorcycle" : "Add motorcycle"
                    }
                />
            </form>
        </div>
    );
};
