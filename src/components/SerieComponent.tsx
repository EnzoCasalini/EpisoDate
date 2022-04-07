import {
    IonCard,IonImg,
    IonInfiniteScroll,
    IonInfiniteScrollContent, IonItem, IonLabel, IonList,
    useIonViewWillEnter, withIonLifeCycle
} from '@ionic/react';
import {useState} from "react";
import {EpisoDateAPI} from "../api/results/EpisoDateAPI";

const SerieComponent: React.FC = () => {

    const [isInfiniteDisabled, setIsInfiniteDisabled] = useState<boolean>(false);
    const [allSeries, setAllSeries] = useState<EpisoDateAPI>({
        page: 0,
        pages: 0,
        total: '0',
        tv_shows: []
    });

    async function GetAllSeries (url:string) {
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

    useIonViewWillEnter(async () => await GetAllSeries(`https://www.episodate.com/api/search?page=1`))

    return (
        <>
            <IonList>
                {
                    allSeries?.tv_shows.map((value) => {
                        console.log(value.name + " " + value.image_thumbnail_path)
                        return(
                                <IonCard key={value.id}>
                                    <IonImg src={value.image_thumbnail_path}/>
                                    <IonItem>
                                        <IonLabel>{value.name}</IonLabel>
                                    </IonItem>
                                </IonCard>
                        )
                    })
                }
            </IonList>
            {/* On active le scroll infini. */ }
            <IonInfiniteScroll
                onIonInfinite={async () => await GetAllSeries(`https://www.episodate.com/api/search?page=${allSeries?.page + 1}` as string)}
                threshold="100px"
                disabled={isInfiniteDisabled}
            >
                <IonInfiniteScrollContent
                    loadingSpinner="bubbles"
                    loadingText="Loading more data..."
                />
            </IonInfiniteScroll>
        </>
    );
};

export default withIonLifeCycle(SerieComponent);