import React, {useEffect, useState} from "react";
import {Series} from "../api/responses/Series";
import {IonIcon} from "@ionic/react";
import {getFavorites, refreshPage, setFav} from "../services/FavService";
import {heart, heartOutline} from "ionicons/icons";

interface IconProps {
    value: Series;
}

const DisplayIconComponent: React.FC<IconProps> = (props: IconProps) => {

    const [favorites, setFavorites] = useState<Series[]>([]);
    // On crée une variable value qui prendra la série actuelle dans le .map de l'affichage des autres pages.
    let value:Series = props.value;

    // On récupère les favoris dans notre Stockage.
    async function catchFavs() {
        let favs = await getFavorites();
        setFavorites(favs);
    }

    // Fonction qui va afficher l'icône favori rempli ou vide en fonction de si la série est présente dans les favoris ou non.
    function displayIcon(value:Series) {
        if (favorites != null) {
            if (favorites.length > 0) {
                // On parcourt le tableau de favoris. Si la série vérifiée et présente dans le tableau "favorites", on affiche le cœur rempli, sinon on le laisse vide.
                for (let i = 0; i < favorites.length; i++) {
                    if (favorites[i].id == value.id) {
                        return (
                            <IonIcon onClick={async (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                await setFav(value);
                                refreshPage();
                            }} slot={"end"} icon={heart} style={{color: "red"}}/>
                        )
                    }
                }
            }
        }
        return (
            <IonIcon onClick={async (e) => {
                e.preventDefault();
                e.stopPropagation();
                await setFav(value);
                refreshPage();
            }} slot={"end"} icon={heartOutline} style={{color: "red"}}/>
        )
    }

    // On récupère les favoris dès le reload de la page.
    useEffect( () => {
        catchFavs();
    }, [])


    return (
        displayIcon(value as Series)
    )

};

export default DisplayIconComponent;