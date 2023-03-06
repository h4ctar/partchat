import { Link, useLocation } from "wouter";
import { MakeSelect } from "./MakeSelect";
import { ModelSelect } from "./ModelSelect";
import { YearSelect } from "./YearSelect";

export const Navbar = () => {
    const [location] = useLocation();

    const match = location.match(
        /^\/makes\/([a-zA-Z]+)(?:\/years\/([0-9]+)(?:\/models\/([a-zA-Z0-9]+)(?:\/diagrams\/([a-zA-Z]+))?)?)?$/
    );

    const make = (match && match[1]) || undefined;
    const year = (match && Number(match[2])) || undefined;
    const model = (match && match[3]) || undefined;
    const diagram = (match && match[4]) || undefined;

    return (
        <nav className="flex gap-10 items-center">
            <h2>
                <Link to="/">PartSwap</Link>
            </h2>

            <MakeSelect make={make} />
            {make && <YearSelect make={make} year={year} />}
            {make && year && (
                <ModelSelect make={make} year={year} model={model} />
            )}

            {/* <select
                name="model"
                id="model"
                className="border-gray-300 rounded-lg shadow-sm"
            >
                <option>XJ650LJ</option>
            </select>
            <select
                name="diagram"
                id="diagram"
                className="border-gray-300 rounded-lg shadow-sm"
            >
                <option>Carburetor</option>
            </select>
            <select
                name="part-number"
                id="part-number"
                className="border-gray-300 rounded-lg shadow-sm"
            >
                <option>97801-05010</option>
            </select> */}
        </nav>
    );
};
