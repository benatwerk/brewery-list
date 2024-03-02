import { useBreweries } from "@/BreweryContext";

const Filter = () => {
    const {
        breweryTypes,
        setFilter,
        resetFilter,
        selectedType,
        setSelectedType,
    } = useBreweries();

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value;
        setSelectedType(selected);
        // If "all" is selected, reset the filter
        if (selected === "all") {
            resetFilter();
        } else {
            setFilter(selected);
        }
    };

    return (
        <>
            <select value={selectedType} onChange={handleTypeChange}>
                <option hidden={selectedType !== ""}>Select a Type</option>
                {selectedType !== "" && selectedType !== "all" ? (
                    <option value="all">All</option>
                ) : null}
                {breweryTypes.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>
        </>
    );
};

export default Filter;
