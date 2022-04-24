import {Storage} from '@capacitor/storage';
import {Series} from "../api/responses/Series";


// Fonction qui permet de mettre une série dans le Stockage si elle n'y est pas déjà. (Si elle est déjà présente, elle est retirée).
const setFav = async (serie: Series) => {
    try {
        let favorites = await getFav();

        if (!isFavorite(favorites, serie))
        {
            //console.log("Dans le if...");
            favorites.push(serie);
        }
        else
        {
            //console.log("Dans le else...");
            favorites = await removeFavorite(favorites, serie);
        }

        await Storage.set({
            key: 'fav',
            value: JSON.stringify(favorites),
        });
    }
    catch (e) {
        console.log(e);
    }
};


// Fonction qui renvoie un boolean en fonction de si la série est déjà dans les favoris ou non.
function isFavorite(favorites:Series[], serie:Series) : boolean {
    for (let i = 0; i < favorites.length; i++)
    {
        if (favorites[i].id == serie.id)
        {
            return true;
        }
    }
    return false;
}


// Fonction qui crée un nouveau tableau avec les favoris actuels.
async function getFav(): Promise<Series[]> {
    const {value} = await Storage.get({key: 'fav'});
    let favorite: Series[] = [];

    if (value) {
        favorite = JSON.parse(value) as Series[];
    }

    return favorite;
}


// Récupère les favoris de notre Stockage.
async function getFavorites() {
    const {value} = await Storage.get({key: 'fav'});

    if (value) {
        return JSON.parse(value);
    }
}


// Supprime une série des favoris et renvoie le tableau modifié.
async function removeFavorite(favorites:Series[], serie:Series) : Promise<Series[]> {

    await Storage.remove({key: 'fav'});

    let temp = 0;

    for (let i = 0; i < favorites.length; i++)
    {
        if (favorites[i].id == serie.id)
        {
            temp = i;
        }
    }

    favorites.splice(temp, 1);
    //console.log(favorites);

    return favorites;
}


// Rafraîchit la page.
function refreshPage() {
    window.location.reload();
}


export { setFav, getFav, refreshPage, getFavorites };