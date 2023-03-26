import { useEffect, useRef, useState } from "react";
import { DiagramResource } from "../../types/motorcycles";
import { useParts } from "../parts/part.hook";

type Props = {
    diagram: DiagramResource;
    selectedPartId?: string;
};

const NORMAL_COLOR = "bg-blue-600/40";
const HIGHLIGHTED_COLOR = "bg-pink-600/40";

export const PartHotspots = ({ diagram, selectedPartId }: Props) => {
    const { query } = useParts(diagram.id);
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    useEffect(() => resizeDiagram(), [diagram]);

    useEffect(() => {
        const listener = () => {
            resizeDiagram();
        };
        window.addEventListener("resize", listener);
        return () => {
            window.removeEventListener("resize", listener);
        };
    }, []);

    const resizeDiagram = () => {
        if (containerRef.current) {
            const container = containerRef.current;
            // If the large breakpoint is used the height will be set, otherwise the width will be set
            if (container.clientWidth) {
                setScale(containerRef.current.clientWidth / diagram.size[0]);
            } else if (container.clientHeight) {
                setScale(containerRef.current.clientHeight / diagram.size[1]);
            }
        }
    };

    return (
        <div ref={containerRef} className="absolute top-0 w-full h-full">
            {query.data?.map(
                (part) =>
                    part.bbox && (
                        <div
                            key={part.id}
                            style={{
                                left: part.bbox[0] * scale,
                                top: part.bbox[1] * scale,
                                width: part.bbox[2] * scale,
                                height: part.bbox[3] * scale,
                            }}
                            className={`absolute ${
                                part.id === selectedPartId
                                    ? HIGHLIGHTED_COLOR
                                    : NORMAL_COLOR
                            }`}
                        ></div>
                    )
            )}
        </div>
    );
};
