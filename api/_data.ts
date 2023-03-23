import {
    MotorcycleResource,
    DiagramResource,
    PartResource,
} from "../types/motorcycles";

export const MOTORCYCLES: MotorcycleResource[] = [
    {
        id: "yamaha-xs750-1976-1981",
        make: "Yamaha",
        model: "XS750D",
        yearFrom: 1976,
        yearTo: 1977,
        image: "/assets/motorcycles/xs750d.png",
    },
    {
        id: "yamaha-xj650lj-1982-1984",
        make: "Yamaha",
        model: "XJ650LJ",
        yearFrom: 1982,
        yearTo: 1984,
        image: "/assets/motorcycles/xj650lj.png",
    },
    {
        id: "honda-cb400f-1975-1977",
        make: "Honda",
        model: "CB400F",
        yearFrom: 1975,
        yearTo: 1977,
        image: "/assets/motorcycles/cb400f.png",
    },
];

export const DIAGRAMS: DiagramResource[] = [
    {
        id: "yamaha-cylinder-head-1",
        name: "Cylinder Head",
        image: "/assets/diagrams/cylinder-head-1.png",
    },
];

export const MOTORCYCLE_DIAGRAMS = [
    {
        motorcycleId: "yamaha-xj650lj-1982-1984",
        diagramId: "yamaha-cylinder-head-1",
    },
];

export const PARTS: PartResource[] = [
    {
        id: "16G-11101-00",
        number: "16G-11101-00",
        description: "CYLINDER HEAD ASSY",
        qty: 1,
    },
];

export const DIAGRAM_PARTS = [
    {
        diagramId: "yamaha-cylinder-head-1",
        partId: "16G-11101-00",
        refNo: 1,
    },
];
