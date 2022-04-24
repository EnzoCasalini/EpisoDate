import {
    IonBackButton,
    IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol,
    IonContent,
    IonGrid,
    IonHeader, IonImg,
    IonPage, IonRow, IonText,
    IonTitle,
    IonToolbar,
    useIonViewWillEnter, withIonLifeCycle
} from "@ionic/react";
import {RouteComponentProps} from "react-router";
import React, {useState} from "react";
import {SerieDetails} from "../api/results/SerieDetails";
import './Details.css';
import RatingComponent from '../components/RatingComponent';


interface DetailsPageProps extends RouteComponentProps<{ permalink: string; }> {
}

const Details: React.FC<DetailsPageProps> = ({match}) => {

    const [serie, setSerie] = useState<SerieDetails>({
        tvShow: {
            id: 0,
            name: "",
            permalink: "",
            url: "",
            description: "",
            network: "",
            image_thumbnail_path: "",
            rating: 0,
            rating_count: 0,
            genres: []
        }
    });

    // Méthode qui permet de récupérer la série correspondante au permalink dans l'url.
    async function getSerie(permalink:string) {
        try {
            const response = await fetch(`https://www.episodate.com/api/show-details?q=${permalink}`);
            const data = await response.json() as SerieDetails; // On récupère les infos de l'API.

            setSerie(data); // On set les infos de la série dans notre state.
        }
        catch (e) {
            console.error(e);
        }
    }


    // Dès qu'on rentre sur la page détails, on appelle la méthode getSerie.
    useIonViewWillEnter(async () => {
        await getSerie(match.params.permalink);
    });

    //console.log(serie);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot={"start"}>
                        <IonBackButton defaultHref={"/tab2"} text={"Back"}/>
                    </IonButtons>
                    <IonTitle class={"ion-text-center"}>
                        Infos
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle class={"ion-text-center"}>
                            <h1 className={"titleStyle"}>{serie.tvShow.name}</h1>
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonImg src={serie.tvShow.image_thumbnail_path} className={"imgStyle"}></IonImg>
                        <IonCardSubtitle className={"subTitleStyle"}>
                            Description :
                        </IonCardSubtitle>
                        <IonText className={"descriptionStyle"}>
                            {serie.tvShow.description}
                        </IonText>
                        <IonGrid className={"gridStyle"}>
                            <IonRow className={"rowStyle"}>
                                <IonCol className={"subTitleStyle"}>
                                    Genres :
                                </IonCol>
                                <IonCol size="7" className={"descriptionStyle ion-align-self-center"}>
                                    {serie.tvShow.genres.map((value => {
                                        return(
                                            value + " "
                                        )
                                    }))}
                                </IonCol>
                            </IonRow>
                            <IonRow className={"rowStyle"}>
                                <IonCol className={"subTitleStyle"}>
                                    Watch on :
                                </IonCol>
                                <IonCol size="7" className={"descriptionStyle ion-align-self-center"}>
                                    {serie.tvShow.network}
                                </IonCol>
                            </IonRow>
                            <IonRow className={"rowStyle"}>
                                <IonCol className={"subTitleStyle"}>
                                    Rating :
                                </IonCol>
                                <IonCol size="7" className={"ion-align-self-center descriptionStyle rateStyle"}>
                                    <RatingComponent>{serie.tvShow.rating}</RatingComponent>
                                    &ensp;({serie.tvShow.rating_count})
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
}

export default withIonLifeCycle(Details);