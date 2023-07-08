import _ from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import type { DiagramResource } from "@partchat/types";
import { useParts } from "../parts/part.hook";
import { ErrorMessage } from "../ui/ErrorMessage";

type Props = {
    diagram: DiagramResource;
    selectedRefNo?: number;
    setSelectedRefNo: (selectedRefNo?: number) => void;
};

const NORMAL_COLOR = "bg-blue-600/40";
const HIGHLIGHTED_COLOR = "bg-pink-600/40";

// TODO: move these into refs
let startX = 0;
let endX = 0;

export const PartHotspots = ({
    diagram,
    selectedRefNo,
    setSelectedRefNo,
}: Props) => {
    const { query, updatePartReference } = useParts({ diagramId: diagram.id });
    const containerRef = useRef<HTMLDivElement | null>(null);
    const setContainerRef = useCallback((container: HTMLDivElement) => {
        containerRef.current = container;
        if (container) {
            resizeDiagram();
        }
    }, []);
    const [scale, setScale] = useState(1);

    useEffect(() => resizeDiagram(), [diagram]);

    useEffect(() => {
        window.addEventListener("resize", resizeDiagram);
        return () => window.removeEventListener("resize", resizeDiagram);
    }, []);

    const resizeDiagram = () => {
        if (containerRef.current) {
            const container = containerRef.current;
            // If the large breakpoint is used the height will be set, otherwise the width will be set
            if (container.clientWidth) {
                setScale(container.clientWidth / diagram.width);
            } else if (container.clientHeight) {
                setScale(container.clientHeight / diagram.height);
            }
        }
    };

    if (!query.data) {
        return null;
    }

    const parts = query.data;

    return (
        <>
            {updatePartReference.isError && (
                <div className="absolute top-0 z-10 w-full p-4">
                    <ErrorMessage error={updatePartReference.error} />
                </div>
            )}
            <div
                ref={setContainerRef}
                className="absolute top-0 h-full w-full"
                onDragOver={(event) => event.preventDefault()}
            >
                {parts.map((part) =>
                    part.hotspots?.map((hotspot, index) => (
                        <div
                            key={`${part.refNo}-${index}`}
                            draggable={true}
                            onDragStart={(event) => {
                                startX = event.clientX;
                                endX = event.clientY;
                            }}
                            onDragEnd={(event) => {
                                const newHotspot = [
                                    hotspot[0] +
                                        (event.clientX - startX) / scale,
                                    hotspot[1] + (event.clientY - endX) / scale,
                                    hotspot[2],
                                    hotspot[3],
                                ];

                                updatePartReference.mutate({
                                    partId: part.id,
                                    diagramId: diagram.id,
                                    hotspots: _.map(part.hotspots, (h, i) =>
                                        i === index ? newHotspot : h,
                                    ),
                                    qty: part.qty!,
                                    refNo: part.refNo!,
                                });
                            }}
                            onMouseEnter={() => setSelectedRefNo(part.refNo)}
                            style={{
                                left: hotspot[0] * scale,
                                top: hotspot[1] * scale,
                                width: hotspot[2] * scale,
                                height: hotspot[3] * scale,
                            }}
                            className={`absolute ${
                                part.refNo === selectedRefNo
                                    ? HIGHLIGHTED_COLOR
                                    : NORMAL_COLOR
                            }`}
                        ></div>
                    )),
                )}
            </div>
        </>
    );
};
