import { useBreweries } from "@/BreweryContext";
import { Brewery } from "@/utils/data";
import styles from "./CardView.module.scss";

const Card = ({ brewery }: { brewery: Brewery }) => {
    const { name, brewery_type, country } = brewery;
    return (
        <div className={styles.card}>
            <img src="https://via.placeholder.com/100" alt="Brewery Image" />
            <div className={styles.details}>
                <h3 title={name}>{name}</h3>
                <p>
                    <strong>{brewery_type}</strong>
                    <em>{country}</em>
                </p>
            </div>
        </div>
    );
};

const CardView = () => {
    const { currentPageBreweries } = useBreweries();

    return (
        <div className={styles.grid}>
            {currentPageBreweries.map((brewery) => (
                <Card key={brewery.id} brewery={brewery} />
            ))}
        </div>
    );
};

export default CardView;
