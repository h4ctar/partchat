import { Link, useLocation } from "wouter";
import { DiagramSelect } from "./DiagramSelect";
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
        <nav className="flex flex-wrap gap-5 items-center p-5">
            <h2>
                <Link to="/">PartSwap</Link>
            </h2>

            <MakeSelect make={make} />
            {make && <YearSelect make={make} year={year} />}
            {make && year && (
                <ModelSelect make={make} year={year} model={model} />
            )}
            {make && year && model && (
                <DiagramSelect
                    make={make}
                    year={year}
                    model={model}
                    diagram={diagram}
                />
            )}
        </nav>
    );
};
