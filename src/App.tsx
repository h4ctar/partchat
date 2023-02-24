import { QueryClient, QueryClientProvider } from "react-query";
import { Link, Route, Switch } from "wouter";
import { Home } from "./Home";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <nav className="flex gap-10 items-center">
        <h2>
          <Link to="/">PartSwap</Link>
        </h2>
        <div>
          <label htmlFor="make" className="block text-sm font-medium">
            Make
          </label>
          <select
            name="make"
            id="make"
            className="border-gray-300 rounded-lg shadow-sm"
          >
            <option>Yamaha</option>
            <option>Honda</option>
          </select>
        </div>
        <div>
          <label htmlFor="year" className="block text-sm font-medium">
            Year
          </label>
          <select
            name="year"
            id="year"
            className="border-gray-300 rounded-lg shadow-sm"
          >
            <option>1980</option>
            <option>1981</option>
            <option>1982</option>
          </select>
        </div>
        <div>
          <label htmlFor="model" className="block text-sm font-medium">
            Model
          </label>
          <select
            name="model"
            id="model"
            className="border-gray-300 rounded-lg shadow-sm"
          >
            <option>XJ650LJ</option>
          </select>
        </div>
        <div>
          <label htmlFor="diagram" className="block text-sm font-medium">
            Diagram
          </label>
          <select
            name="diagram"
            id="diagram"
            className="border-gray-300 rounded-lg shadow-sm"
          >
            <option>Carburetor</option>
          </select>
        </div>
        <div>
          <label htmlFor="part-number" className="block text-sm font-medium">
            Part Number
          </label>
          <select
            name="part-number"
            id="part-number"
            className="border-gray-300 rounded-lg shadow-sm"
          >
            <option>97801-05010</option>
          </select>
        </div>
      </nav>
      <section>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route>404, Not Found!</Route>
        </Switch>
      </section>
    </QueryClientProvider>
  );
};
