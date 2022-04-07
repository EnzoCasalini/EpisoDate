import {
    IonCard,
    IonContent,
    IonHeader, IonImg,
    IonInfiniteScroll,
    IonInfiniteScrollContent, IonItem, IonLabel, IonList,
    IonPage, IonText,
    IonTitle,
    IonToolbar, useIonViewWillEnter
} from '@ionic/react';
import './Tab1.css';
import {useState} from "react";
import {EpisoDateAPI} from "../api/results/EpisoDateAPI";

const Tab1: React.FC = () => {

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
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
          <IonList>
              {
                  allSeries?.tv_shows.map((value) => {
                      return(
                          <>
                          <IonCard>
                              <IonImg src={value.image_thumbnail_path}/>
                              <IonItem>
                                  <IonLabel>{value.name}</IonLabel>
                              </IonItem>
                          </IonCard>

                          </>
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
      </IonContent>
    </IonPage>
    );
    };

    export default Tab1;
