import './App.css';
import Carte from './components/carte.component';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';

import chat1 from '../public/chat1.png';
import chat2 from '../public/chat2.png';
import chat3 from '../public/chat3.png';
import chat4 from '../public/chat4.png';
import chat5 from '../public/chat5.png';
import chat6 from '../public/chat6.png';
import chat7 from '../public/chat7.png';
import chat8 from '../public/chat8.png';
import dessus from '../public/dessus-carte.svg';

//Permet de redémarer la partie
const redemarrer = () => {
  window.location.reload();
};

//Permet de mélanger un tableau de string
function MelangerTableau(tableau: Array<string>) {
  // ER: Mauvaise utilisation de for. La première partie du for est pour initialise la variable...
  let i = tableau.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = tableau[i];
    tableau[i] = tableau[j];
    tableau[j] = temp;
  }
  return tableau;
}

// ER: Très mauvaise façon de placer les cartes. Les 16 cartes doivent pouvoir être à n'importe quel endroit.
var RangeeImage1 = [chat1, chat2, chat3, chat4];
var RangeeImage2 = [chat5, chat6, chat7, chat8];
var RangeeImage3 = [chat1, chat2, chat3, chat4];
var RangeeImage4 = [chat5, chat6, chat7, chat8];

RangeeImage1 = MelangerTableau(RangeeImage1);
RangeeImage2 = MelangerTableau(RangeeImage2);
RangeeImage3 = MelangerTableau(RangeeImage3);
RangeeImage4 = MelangerTableau(RangeeImage4);

//l'application
function App() {
  var [nbCoups, setNbCoup] = useState(20);
  var nbClique = 0;

  //Fonction pour réduire le nombre d'essai effectué
  function reduireEssai() {
    nbClique++;
    if (nbClique >= 2) {
      if (nbCoups >= 0) {
        setNbCoup(nbCoups--);
        nbClique = 0;
      }
    }
  }

  //Variable d'état pour afficher les messages
  const [gagnerMessage, setGagnerMessage] = useState(false);
  const [perduMessage, setPerduMessage] = useState(false);

  //Affiche le message perdu s'il n'a plus d'essais
  useEffect(() => {
    if (nbCoups <= 0) {
      setPerduMessage(true);
    }
  }, [nbCoups]);

  return (
    <>
      {gagnerMessage && <div> Bravo, vous avez réussi !</div>}
      {perduMessage && <div> Vous avez perdu... </div>}
      <Button variant="contained" onClick={redemarrer}>
        Redémarrer
      </Button>
      <div>Nombre de coups restants : {nbCoups}</div>

      <div className="rangee">
        {RangeeImage1.map((image, index) => (
          <Carte
            dessus={dessus}
            clef={index + 'row1'}
            photo={image as string}
            reduireEssai={reduireEssai}
          />
        ))}
      </div>

      <div className="rangee">
        {RangeeImage2.map((image, index) => (
          <Carte
            dessus={dessus}
            clef={index + 'row2'}
            photo={image as string}
            reduireEssai={reduireEssai}
          />
        ))}
      </div>

      <div className="rangee">
        {RangeeImage3.map((image, index) => (
          <Carte
            dessus={dessus}
            clef={index + 'row3'}
            photo={image as string}
            reduireEssai={reduireEssai}
          />
        ))}
      </div>

      <div className="rangee">
        {RangeeImage4.map((image, index) => (
          <Carte
            dessus={dessus}
            clef={index + 'row4'}
            photo={image as string}
            reduireEssai={reduireEssai}
          />
        ))}
      </div>
    </>
  );
}

export default App;
