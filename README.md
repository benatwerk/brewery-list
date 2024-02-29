# Brewery List

A React application bootstrapped with Vite, designed to fetch, display, and manage a list of breweries using data from the Open Brewery DB API (https://www.openbrewerydb.org/documentation)

## Installation

This project is set up using Vite. To get started, clone the repository and install the dependencies.

```bash
git clone https://github.com/benatwerk/brewery-list.git
cd brewery-list
npm install
```

To run the application locally:

```bash
npm run dev
```

## Done

1. Fetch JSON data and display it (https://api.openbrewerydb.org/breweries?per_page=200)
2. Sort the list of breweries by name, but grouped by brewery_type (also alphabetical)
3. Add simple pagination to the table (10 per page). Can be done exclusively client-side.
4. Add a dropdown to filter the results by brewery_type.
5. Add an additional view for the brewery list which is a grid of 100x200px cards and the rows overflow. Add a button or some sort of toggle to switch between table and card views. The existing filtering and sorting should apply to both views.

## Packages

This project uses the following packages:

-   `classnames`: A simple utility for conditionally joining classNames together.
-   `sass`: A preprocessor scripting language that is interpreted or compiled into CSS.

## Notes

Sorting and pagination were implemented client-side. While the API supports sorting (`sort=type,name`) and filtering by type (`by_type`), as well as pagination, I did it client-side because it felt like the point of the exercise was to show the code, not rely on the API. It also better matches the requirment of getting 200 results and getting the types from those.

## Didn't Do

-   Testing, due to time constraints (2 hours).
-   Better styling, due to time constraints.
-   "Disregard styling of the table". I couldn't look at those centered theads, so I styled is a bit.
