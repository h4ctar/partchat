export const MOTORCYCLES = [
    {
        id: "yamaha-xs750-1976-1981",
        make: "Yamaha",
        model: "XS750",
        yearFrom: 1976,
        yearTo: 1981,
        image: "https://basethree.s3.eu-west-1.amazonaws.com/1539768708718",
    },
    {
        id: "yamaha-xj650lj-1982-1984",
        make: "Yamaha",
        model: "XJ650LJ",
        yearFrom: 1982,
        yearTo: 1984,
        image: "https://i.pinimg.com/originals/48/1f/04/481f0480e37c7f754e1ba7f7518839c4.jpg",
    },
    {
        id: "honda-cb400f-1975-1977",
        make: "Honda",
        model: "CB400F",
        yearFrom: 1975,
        yearTo: 1977,
        image: "https://www.bike-urious.com/wp-content/uploads/Honda-CB400F-Super-Sport-Front-Right.jpg",
    },
];

export const DIAGRAMS = [
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

export const PARTS = [
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
