import { Link, Route, useLocation } from "wouter";
import { MakeSelect } from "./MakeSelect";
import { ModelSelect } from "./ModelSelect";
import { YearSelect } from "./YearSelect";
import { useSearch } from "wouter/use-location";

export const Navbar = () => {
    const search = useSearch();

    const searchParams = new URLSearchParams(search);
    const make = searchParams.get("make") || undefined;
    const year = parseInt(searchParams.get("year") || "") || undefined;
    const model = searchParams.get("model") || undefined;

    return (
        <div className="flex flex-wrap gap-5 items-center p-5 border-b dark:border-slate-50/[0.06]">
            <h2>
                <Link to="/">PartSwap</Link>
            </h2>
            <Route path="/motorcycles">
                <MakeSelect make={make} />
                {make && <YearSelect make={make} year={year} />}
                {make && year && (
                    <ModelSelect make={make} year={year} model={model} />
                )}
            </Route>
        </div>
    );
};
