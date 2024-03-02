import React, { createContext, useContext, useState, useEffect } from "react";
import {
    PAGE_SIZE,
    Brewery,
    FetchParams,
    buildBreweryFetchUrl,
    sortAndGroupBreweries,
    getUniqueBreweryTypes,
    filterBreweriesByType,
} from "./utils/data";

interface BreweryContextType {
    breweries: Brewery[];
    currentPageBreweries: Brewery[];
    setCurrentPage: (page: number) => void;
    breweryTypes: string[];
    selectedType: string;
    setSelectedType: (type: string) => void;
    currentPage: number;
    totalPages: number;
    setFilter: (filter: string) => void;
    resetFilter: () => void;
    setViewType: (viewType: string) => void;
    viewType: string;
}

const BreweryContext = createContext<BreweryContextType | undefined>(undefined);

const getURLParam = (
    type: string,
    def: string | number | undefined
): string | number | undefined => {
    const urlString = window.location.search;
    const params = new URLSearchParams(urlString);
    const value = params.get(type);
    return value !== null ? value : def;
};

export const BreweryProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [allBreweries, setAllBreweries] = useState<Brewery[]>([]);
    const [breweries, setBreweries] = useState<Brewery[]>([]);
    const [currentPageBreweries, setCurrentPageBreweries] = useState<Brewery[]>(
        []
    );
    const [breweryTypes, setBreweryTypes] = useState<string[]>([]);
    const [selectedType, setSelectedType] = useState(
        getURLParam("type", "all") as string
    );
    const [currentPage, setCurrentPage] = useState(
        Number(getURLParam("page", 1))
    );
    const [totalPages, setTotalPages] = useState(0);
    const [viewType, setViewType] = useState(
        getURLParam("view", "table") as string
    );

    const fetchBreweries = async (params: FetchParams = { perPage: 50 }) => {
        const url = buildBreweryFetchUrl(params);
        try {
            const response = await fetch(url);
            const json: Brewery[] = await response.json();
            // Sort and group the breweries by type
            const sortedAndGrouped = sortAndGroupBreweries(json);
            // Set the state for all breweries to be used for resetting the filter
            setAllBreweries(sortedAndGrouped);
            // Set the state for the current breweries
            setBreweries(sortedAndGrouped);
            // Set the total pages for pagination
            setTotalPages(Math.ceil(sortedAndGrouped.length / PAGE_SIZE));
            // Get the unique types of breweries for the filter
            const uniqueBreweryTypes = getUniqueBreweryTypes(sortedAndGrouped);
            setBreweryTypes(uniqueBreweryTypes);
            // Paginate the breweries, start at 1
            paginate(currentPage, sortedAndGrouped);
        } catch (error) {
            console.error("Failed to fetch breweries:", error);
        }
    };

    // Fetch the breweries on init
    useEffect(() => {
        fetchBreweries({ perPage: 200 });
        // I think react 19 fixes this common issue and using signals wouldn't be bad here either but I'm not familar enough with it to use here
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    interface SearchParams {
        page?: number;
        view?: string;
        type?: string;
    }

    const setSearchParams = (params: SearchParams) => {
        const query = new URLSearchParams(Object.entries(params));
        return query.toString();
    };

    useEffect(() => {
        const urlParams = setSearchParams({
            page: currentPage,
            view: viewType,
        });
        window.history.replaceState(null, "", `?${urlParams}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, viewType]);

    const paginate = (page: number, breweriesData: Brewery[] = breweries) => {
        const offset = (page - 1) * PAGE_SIZE;
        const paginatedItems = breweriesData.slice(offset, offset + PAGE_SIZE);
        setCurrentPageBreweries(paginatedItems);
        setCurrentPage(page);
    };

    const setCurrentPageAndPaginate = (page: number) => {
        if (page < 1 || page > totalPages) return;
        paginate(page);
    };

    const setFilter = (filter: string) => {
        // Filter the breweries by type or set to allBreweries if filter is empty
        const filteredBreweries = filter
            ? filterBreweriesByType(allBreweries, filter)
            : allBreweries;
        setBreweries(filteredBreweries);
        setTotalPages(Math.ceil(filteredBreweries.length / PAGE_SIZE));
        paginate(1, filteredBreweries);
    };

    const resetFilter = () => {
        setFilter("");
    };

    return (
        <BreweryContext.Provider
            value={{
                breweries,
                currentPageBreweries,
                setCurrentPage: setCurrentPageAndPaginate,
                breweryTypes,
                selectedType,
                setSelectedType,
                currentPage,
                totalPages,
                setFilter,
                resetFilter,
                setViewType,
                viewType,
            }}
        >
            {children}
        </BreweryContext.Provider>
    );
};

// For the purposes of this exercise I didn't want to make another file for this very simple hook just for a vite warning about fast-refresh
// eslint-disable-next-line react-refresh/only-export-components
export const useBreweries = () => {
    const context = useContext(BreweryContext);
    if (context === undefined) {
        throw new Error("useBreweries must be used within a BreweryProvider");
    }
    return context;
};
