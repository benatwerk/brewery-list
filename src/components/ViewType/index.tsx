import { useBreweries } from "@/BreweryContext";

const Filter = () => {
    const { viewType, setViewType } = useBreweries();

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value;
        setViewType(selected);
    };

    return (
        <>
            <select value={viewType} onChange={handleTypeChange}>
                <option value="table">Table</option>
                <option value="card">Card</option>
            </select>
        </>
    );
};

export default Filter;
