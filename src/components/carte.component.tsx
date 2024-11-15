import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Grid } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';

//Interface pour les paramètres
interface IChatProps {
  dessus: string;
  photo: string;
  clef: string;
  reduireEssai: () => void;
}

//Représente une carte à retourner
const Carte = (props: IChatProps) => {
    const [affiche, setAffiche] = useState(false); //variable d'état pour afficher ou non la photo

    //Gère si la carte a été cliquer
    const [clicked, setClicked] = useState(false);
    const handleClick = useCallback(() => {
    setClicked(true);
    props.reduireEssai();
    }, []);

    //Affiche la carte lorsqu'elle est cliquée
    useEffect(() => {
    if (clicked) {
        setAffiche(true);
    }
    }, [clicked]);

  return (
    <Card sx={{ width: 100 }} onClick={handleClick}>
      <Grid container spacing={0} direction="column" alignItems="center">
        <CardMedia key={props.clef}
          image={affiche ? props.photo : props.dessus}
          sx={{ height: 100, width: 100 }}
        />
      </Grid>
    </Card>
  );
};

export default Carte;