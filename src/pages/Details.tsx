import {
    IonBackButton,
    IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol,
    IonContent,
    IonGrid,
    IonHeader, IonIcon, IonImg, IonItem, IonLabel,
    IonPage, IonRow, IonText, IonThumbnail,
    IonTitle,
    IonToolbar,
    useIonViewWillEnter, withIonLifeCycle
} from "@ionic/react";
import {RouteComponentProps} from "react-router";
import React, {useState} from "react";
import {SerieDetails} from "../api/results/SerieDetails";
import {Series} from "../api/responses/Series";
import {homeOutline, star, starHalf} from "ionicons/icons";


interface DetailsPageProps extends RouteComponentProps<{ permalink: string; }> {
}

const Details: React.FC<DetailsPageProps> = ({match}) => {

    const imgStyle = {
        margin: "20px",
    };

    const titleStyle = {
        textDecoration: "underline",
        fontWeight: "bold",
        fontSize: "35px",
    };

    const descriptionStyle = {
        fontSize: "20px",
        lineHeight: "25px",
        paddingTop: "8px",
    }

    const subTitleStyle = {
        fontSize: "24px",
        fontWeight: "bold",
        color: "white"
    }

    const gridStyle = {
        marginTop: "30px"
    }

    const rowStyle = {
        marginBottom: "20px",
    }

    const rateStyle = {
        display: "flex",
        alignItems: "center",
    }


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
    async function GetSerie(permalink:string) {
        try {
            const response = await fetch(`https://www.episodate.com/api/show-details?q=${permalink}`);
            const data = await response.json() as SerieDetails; // On récupère les infos de l'API.

            setSerie(data); // On set les infos de la série dans notre state.
        }
        catch (e) {
            console.error(e);
        }
    }

    function calculateRating(rating:number) {
        let temp = [];
        let rate = Math.round(rating) * 0.5;

        if (rate % 1 == 0)
        {
            for (let i = 0; i < rate; i++)
            {
                temp.push(<IonIcon icon={star}/>);
            }
            return (
                temp
            )
        }
        else {
            for (let i = 0; i < rate - 1; i++)
            {
                temp.push(<IonIcon icon={star}/>);
            }
            temp.push(<IonIcon icon={starHalf}/>)
            return (
                temp
            )
        }
    }

    // Dès qu'on rentre sur la page détails, on appelle la méthode GetSerie.
    useIonViewWillEnter(async () => {
        await GetSerie(match.params.permalink);
    });

    console.log(serie);

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
                            <h1 style={titleStyle}>{serie.tvShow.name}</h1>
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonImg src={serie.tvShow.image_thumbnail_path} style={imgStyle}></IonImg>
                        <IonCardSubtitle style={subTitleStyle}>
                            Description :
                        </IonCardSubtitle>
                        <IonText style={descriptionStyle}>
                            {serie.tvShow.description}
                        </IonText>
                        <IonGrid style={gridStyle}>
                            <IonRow style={rowStyle}>
                                <IonCol style={subTitleStyle}>
                                    Genres :
                                </IonCol>
                                <IonCol size="7" style={descriptionStyle} className={"ion-align-self-center"}>
                                    {serie.tvShow.genres.map((value => {
                                        return(
                                            value + " "
                                        )
                                    }))}
                                </IonCol>
                            </IonRow>
                            <IonRow style={rowStyle}>
                                <IonCol style={subTitleStyle}>
                                    Watch on :
                                </IonCol>
                                <IonCol size="7" style={descriptionStyle} className={"ion-align-self-center"}>
                                    {serie.tvShow.network}
                                </IonCol>
                            </IonRow>
                            <IonRow style={rowStyle}>
                                <IonCol style={subTitleStyle}>
                                    Rating :
                                </IonCol>
                                <IonCol size="7" style={{...descriptionStyle,...rateStyle}} className={"ion-align-self-center"}>
                                    {calculateRating(serie.tvShow.rating)}
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