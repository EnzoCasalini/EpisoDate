import React, { Component } from "react";
import {IonIcon, IonText} from "@ionic/react";
import {star, starHalf, starOutline} from "ionicons/icons";

class RatingComponent extends React.Component {
    render () {

        // Fonction qui permet de calculer le nombre d'étoiles d'une série.
        function calculateRating(rating:number) {
            let temp = [];
            let rate = Math.round(rating) * 0.5;
            let stars = 5;

            if (rate !== 0)
            {
                if (rate % 1 === 0)
                {
                    for (let i = 0; i < stars; i++)
                    {
                        if (i < rate)
                            temp.push(<IonIcon icon={star}/>);
                        else
                            temp.push(<IonIcon icon={starOutline}/>);
                    }
                    return (temp)
                }
                else {
                    for (let i = 0; i < stars; i++)
                    {
                        //console.log("rate : " + rate);
                        if (i < rate && i + 0.5 != rate)
                            temp.push(<IonIcon icon={star}/>);
                        else if (i + 0.5 == rate)
                            temp.push(<IonIcon icon={starHalf}/>);
                        else
                            temp.push(<IonIcon icon={starOutline}/>);
                    }
                    return (temp)
                }
            }
            else {
                for (let i = 0; i < stars; i++)
                {
                    temp.push(<IonIcon icon={starOutline}/>);
                }
                return (temp);
            }
        }

        return (
            <IonText className={"rating"}>
                {calculateRating(this.props.children as number)}
            </IonText>
        )
    }
}

export default RatingComponent;