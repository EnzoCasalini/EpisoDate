import {
    IonCard, IonCardContent,
    IonContent,
    IonHeader, IonImg, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonList,
    IonPage, IonText,
    IonTitle,
    IonToolbar, useIonViewWillEnter, withIonLifeCycle,
} from '@ionic/react';
import './Home.css';
import {useState} from "react";
import {EpisoDateAPI} from "../api/results/EpisoDateAPI";
import {getSeries} from "../services/EpisodeService";
import DisplayIconComponent from "../components/DisplayIconComponent";


const Home: React.FC = () => {

    const [isInfiniteDisabled, setIsInfiniteDisabled] = useState<boolean>(false);
    const [allSeries, setAllSeries] = useState<EpisoDateAPI>({
        page: 0,
        pages: 0,
        total: '0',
        tv_shows: [],
    });


    async function getAllSeries (url:string) {
        try {
            setIsInfiniteDisabled(true);

            const _allSeries = await getSeries(url, allSeries);
            setAllSeries(_allSeries);

            setIsInfiniteDisabled(false);
        }
        catch (e) {
            console.error(e);
        }
    }


    useIonViewWillEnter(async () => {
        await getAllSeries(`https://www.episodate.com/api/most-popular?page=1`);
    });


    return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className={"ion-text-center"}>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
            <IonText className={"ion-text-center"}>
                <h1 className={"title"}>Most Popular Shows</h1>
            </IonText>
            {
              allSeries?.tv_shows.map((value) => {
                  return(
                      <IonCard routerLink={"details/" + value.permalink} key={value.id} className={"cardStyle"}>
                          <IonImg src={value.image_thumbnail_path}/>
                          <IonCardContent>
                              <IonItem key={value.id}>
                                  <IonLabel slot={"start"} className={"labelStyle"}>{value.name}</IonLabel>
                                  <DisplayIconComponent value={value}/>
                              </IonItem>
                          </IonCardContent>
                      </IonCard>
                  )
              })
            }
        </IonList>
          {/* On active le scroll infini. */ }
          <IonInfiniteScroll
              onIonInfinite={async () => await getAllSeries(`https://www.episodate.com/api/most-popular?page=${allSeries?.page + 1}` as string)}
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

export default withIonLifeCycle(Home);
