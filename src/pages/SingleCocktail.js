import React from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
import { useCallback } from "react";
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
    const { id } = useParams();
    const [loading, setLoading] = React.useState(false);
    const [cocktail, setCocktail] = React.useState(null);

    const fetchData = useCallback( async () => {
        try {
            const response = await fetch(`${url}${id}`);
            const data = await response.json();
            if (data.drinks) {
                const {
                    strDrink: name,
                    strDrinkThumb: image,
                    strAlcoholic: info,
                    strCategory: category,
                    strGlass: glass,
                    strInstructions: instructions,
                    strIngredient1,
                    strIngredient2,
                    strIngredient3,
                    strIngredient4,
                    strIngredient5,
                } = data.drinks[0];
                const ingredients = [
                    strIngredient1,
                    strIngredient2,
                    strIngredient3,
                    strIngredient4,
                    strIngredient5,
                ];
                const newCocktail = {
                    name,
                    image,
                    info,
                    category,
                    glass,
                    instructions,
                    ingredients,
                };
                setCocktail(newCocktail);
            } else {
                setCocktail(null);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    },[id]);

    React.useEffect(() => {
        setLoading(true);
        fetchData();
    }, [id, fetchData]);

    if (loading) {
        return <Loading />;
    }
    if (!cocktail) {
        return <h2 className="section-title">Pas de Cocktail</h2>;
    }

    const {
        name,
        image,
        category,
        info,
        instructions,
        glass,
        ingredients,
    } = cocktail;
    return (
        <section className="section cocktail-section">
            <Link to="/" className="btn btn-primary">
                Back Home
            </Link>
            <h2 className="section-title">{name}</h2>
            <div className="drink">
                <img src={image} alt={name} />
                <div className="drink-info">
                    <p>
                        <span className="drink-data">Nom : </span>
                        {name}
                    </p>
                    <p>
                        <span className="drink-data">Categorie : </span>
                        {category}
                    </p>
                    <p>
                        <span className="drink-data">Info : </span>
                        {info}
                    </p>
                    <p>
                        <span className="drink-data">Verre : </span>
                        {glass}
                    </p>
                    <p>
                        <span className="drink-data">Instruction : </span>
                        {instructions}
                    </p>
                    <p>
                        <span className="drink-data ">ingredients :</span>
                        {ingredients.map((item, index) => {
                            return item ? (
                                <span key={index}>{item}  </span>
                            ) : null;
                        })}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default SingleCocktail;
