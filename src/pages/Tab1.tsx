import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import './Tab1.css';
import {useState} from "react";
import SerieComponent from "../components/SerieComponent";

const Tab1: React.FC = () => {

    return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
          <SerieComponent/>
      </IonContent>
    </IonPage>
    );
    };

    export default Tab1;
