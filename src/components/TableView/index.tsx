import { useBreweries } from "@/BreweryContext";
import styles from "./TableView.module.scss";

const TableView = () => {
    const { currentPageBreweries } = useBreweries();

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Country</th>
                </tr>
            </thead>
            <tbody>
                {currentPageBreweries.map((brewery) => {
                    const {
                        id,
                        name,
                        brewery_type,
                        street,
                        city,
                        state,
                        country,
                    } = brewery;
                    return (
                        <tr key={id}>
                            <td>{name}</td>
                            <td>{brewery_type}</td>
                            <td>{street}</td>
                            <td>{city}</td>
                            <td>{state}</td>
                            <td>{country}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default TableView;
