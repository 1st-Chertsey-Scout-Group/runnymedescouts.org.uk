import { useCatalogue, type Product } from "./state/catalogue.store";

type QuantitySelectorProps = {
    products: Product[]
};

export const CatalogueStorer: React.FC<QuantitySelectorProps> = ({ products }) => {
    const catalogue = useCatalogue();
    if (!catalogue.actions.hasProducts()) {
        catalogue.actions.addProducts(products);
    }
    return (<></>);
};