export const PAGE_SIZE = 10;
export const TOTAL_SIZE = 200;

export interface Brewery {
    id: string;
    name: string;
    brewery_type: string;
    address_1: string | null;
    address_2: string | null;
    address_3: string | null;
    city: string;
    state_province: string;
    postal_code: string;
    country: string;
    longitude: string;
    latitude: string;
    phone: string;
    website_url: string | null;
    state: string;
    street: string;
}

export interface FetchParams {
    sort?: string;
    byType?: string;
    page?: number;
    perPage?: number;
}

// Make a url to fetch breweries from the API (would work to filter/sort/paginate server-side)
export const buildBreweryFetchUrl = (params: FetchParams): string => {
    const baseUrl = "https://api.openbrewerydb.org/breweries";
    const query = new URLSearchParams();

    if (params.sort) {
        query.append("sort", params.sort);
    }

    if (params.byType) {
        query.append("by_type", params.byType);
    }

    if (params.page) {
        query.append("page", params.page.toString());
    }
    if (params.perPage) {
        query.append("per_page", params.perPage.toString());
    }

    return `${baseUrl}?${query.toString()}`;
};

export const sortAndGroupBreweries = (breweries: Brewery[]): Brewery[] => {
    // Sort by name first
    breweries.sort((a, b) => a.name.localeCompare(b.name));

    // Then sort by type
    return breweries.sort((a, b) =>
        a.brewery_type.localeCompare(b.brewery_type)
    );
};

export const getUniqueBreweryTypes = (breweries: Brewery[]): string[] => {
    // Use a Set to store unique types
    const uniqueTypes = new Set<string>();
    breweries.forEach((brewery) => uniqueTypes.add(brewery.brewery_type));
    // Sort the types and return as an array
    return Array.from(uniqueTypes).sort();
};

export const filterBreweriesByType = (
    breweries: Brewery[],
    type: string
): Brewery[] => {
    // If no type or "all" is selected, return all breweries
    if (!type || type === "all") {
        return breweries;
    }

    // Otherwise, filter by type
    return breweries.filter((brewery) => brewery.brewery_type === type);
};
