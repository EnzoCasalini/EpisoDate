import {
    IonContent,
    IonHeader, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel,
    IonList,
    IonPage,
    IonSearchbar,
    IonTitle,
    IonToolbar,
    useIonViewWillEnter
} from '@ionic/react';
import './Tab2.css';
import {useState} from "react";
import {EpisoDateAPI} from "../api/results/EpisoDateAPI";

const Tab2: React.FC = () => {

    const [searchText, setSearchText] = useState('');
    const [isInfiniteDisabled, setIsInfiniteDisabled] = useState<boolean>(false);
    const [allSeries, setAllSeries] = useState<EpisoDateAPI>({
        page: 0,
        pages: 0,
        total: '0',
        tv_shows: [],
    });

    async function GetSeries (url:string) {
        try {
            setIsInfiniteDisabled(true);

            const response = await fetch(url);
            const data = await response.json() as EpisoDateAPI;

            setAllSeries({
                page: data.page,
                pages: data.pages,
                total: data.total,
                tv_shows: [...allSeries.tv_shows, ...data.tv_shows]
            });

            setIsInfiniteDisabled(false);
        }
        catch (e) {
            console.error(e);
        }
    }

    // Méthode pour filtrer les épisodes avec la barre de recherche.
    async function SearchSeries(name:string) {
        try {
            setIsInfiniteDisabled(true);

            setSearchText(name); // On écrit dans la barre de recherche.

            let url = `https://www.episodate.com/api/search?q=${name}&page=1`;
            let response = await fetch(url);
            let data = await response.json() as EpisoDateAPI; // On stocke la réponse du serveur dans data.
            //console.log(data);

            if (data.total == '0') // Ce cas arrive quand on ne trouve pas de match.
            {
                setAllSeries({
                    page: 0,
                    pages: 0,
                    total: '0',
                    tv_shows: [{
                        id: 9999999,
                        name: 'No Matches Found',
                        permalink: 'no-matches-found',
                        url: 'nomatchesfound',
                        description: "nomatchesfound",
                        network: "nomatchesfound",
                        image_thumbnail_path: "nomatchesfound",
                        rating: 0,
                        rating_count: 0,
                        genres: ["nomatchesfound"]
                    }]
                })
            }
            else { // Si data a des informations, on les met dans notre state "allSeries".
                setAllSeries({
                    page: data.page,
                    pages: data.pages,
                    total: data.total,
                    tv_shows: data.tv_shows
                });
            }

            setIsInfiniteDisabled(false);

            return name;
        }
        catch (e) {
            console.error(e);
        }
    }


    //console.log(episodes.info)

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    {/* On appelle la fonction SearchEpisodes dès qu'il y a une modification de la SearchBar.*/ }
                    <IonSearchbar value={searchText} onIonChange={async (e) => {await SearchSeries(e.detail.value!);}}
                    animated/>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    {allSeries.tv_shows.map( (serie) => {
                        if (serie.name != "No matches found") {
                            return (
                                <IonItem key={serie.id}>
                                    <IonLabel>
                                        {serie.name}
                                    </IonLabel>
                                </IonItem>
                            )
                        }
                        else
                        {
                            return (
                                <IonLabel key={serie.id}>
                                    {serie.name} <br/>
                                </IonLabel>
                            )
                        }
                    })}
                </IonList>
                {/* On active le scroll infini. */ }
                <IonInfiniteScroll
                    onIonInfinite={async () =>
                    {
                        if (allSeries.page < allSeries.pages)
                        {
                            await GetSeries(`https://www.episodate.com/api/search?q=${searchText}&page=${allSeries?.page + 1}` as string)
                        }
                        else {
                            setIsInfiniteDisabled(true);
                        }
                    }}
                    threshold="100px"
                    disabled={isInfiniteDisabled}
                >
                    <IonInfiniteScrollContent
                        loadingSpinner="bubbles"
                        loadingText="Loading more data..."
                    />
                </IonInfiniteScroll>
            </IonContent>
        </IonPage>
    );
};

export default Tab2;
