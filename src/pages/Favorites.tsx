import {
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonImg, IonItem, IonLabel, IonList,
  IonPage,
  IonTitle,
  IonToolbar, useIonViewWillEnter
} from '@ionic/react';
import './Favorite.css';
import {getFavorites} from "../services/FavService";
import {useEffect, useState} from "react";
import {Series} from "../api/responses/Series";
import DisplayIconComponent from "../components/DisplayIconComponent";

const Favorites: React.FC = () => {

  const [favorites, setFavorites] = useState<Series[]>([]);

  // On récupère les favoris dans notre Stockage.
  async function catchFavs() {
    let favs = await getFavorites();
    setFavorites(favs);
  }


/*
  useEffect( () => {
    getFavorites();
  }, [])
*/


  useIonViewWillEnter(async () => {
    await catchFavs();
  });

    return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className={"ion-text-center"}>Favorites</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {
            favorites.map((value) => {
              return(
                  <IonCard routerLink={"details/" + value.permalink} className={"cardStyle"}>
                    <IonImg src={value.image_thumbnail_path}/>
                    <IonCardContent>
                      <IonItem>
                        <IonLabel slot={"start"} className={"labelStyle"}>{value.name}</IonLabel>
                        <DisplayIconComponent value={value}/>
                      </IonItem>
                    </IonCardContent>
                  </IonCard>
              )
            })
          }
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Favorites;
