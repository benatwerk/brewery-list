import { useBreweries } from "@/BreweryContext";
import {
    TableView,
    CardView,
    ViewType,
    Pagination,
    Filter,
} from "./components";
import "./App.scss";

function App() {
    const { viewType } = useBreweries();
    return (
        <>
            View: <ViewType /> Type: <Filter />
            <Pagination />
            {viewType === "table" ? <TableView /> : <CardView />}
            <Pagination />
        </>
    );
}

export default App;
