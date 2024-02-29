import { useBreweries } from "@/BreweryContext";
import classNames from "classnames";
import styles from "./Pagination.module.scss";

const Pagination = () => {
    const { currentPage, totalPages, setCurrentPage } = useBreweries();

    const getPageNumbers = () => {
        const pages = [];

        // Show 5 pages at a time
        let startPage = Math.max(currentPage - 2, 1);
        let endPage = startPage + 4; // Show 5 pages at a time

        // If we are at the end, show the last 5 pages
        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - 4);
        }

        // If we are at the start, show the first 5 pages
        for (let page = startPage; page <= endPage; page++) {
            pages.push(page);
        }

        return pages;
    };

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className={styles.pagination}>
            <button
                className={styles.button}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
            >
                Previous
            </button>
            {pageNumbers.map((page) => (
                <button
                    key={page}
                    className={classNames(styles.button, {
                        [styles.current]: currentPage === page,
                    })}
                    onClick={() => handlePageChange(page)}
                >
                    {page}
                </button>
            ))}
            <button
                className={styles.button}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
