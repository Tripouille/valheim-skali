import Figure from 'components/core/Images/Figure';
import ZoomableImage from 'components/core/Images/ZoomableImage';
import Paragraphs from 'components/core/Typography/Paragraphs';

const InstancesRules = () => (
  <>
    <Paragraphs
      paragraphs={[
        `Construire quelque part, c'est ajouter des éléments à notre monde. Tous les joueurs qui passeront par là devront charger et afficher ces éléments sur leur ordinateur, et ça peut vite ralentir leur jeu (et les frustrer !).`,
        `Pour limiter les ralentissements, il est interdit de construire s’il y a déjà plus de 9500 instances dans une zone. Dans Valheim, les instances désignent n’importe quel objet chargé par le jeu. Pour voir combien il y en a dans une zone, il suffit d’appuyer sur F2 et de lire la ligne ’instances’ dans le panneau qui se sera ouvert.`,
      ]}
    />
    <Figure legend="Exemple avec 4753 instances" display="block" textAlign="center" mt={5}>
      <ZoomableImage
        data-cy="instances"
        src="https://i.imgur.com/ajnU902.png"
        alt="Screenshot des instances"
        height={200}
        width={550}
        objectFit="cover"
        objectPosition="top"
      />
    </Figure>
    <Paragraphs
      mt={5}
      paragraphs={[
        `Rassurez-vous, cette limite permet tout de même de faire de jolies bases ! Mais les grands architectes devront bien y penser avant de réaliser le projet de leur rêve.`,
        `Dans la même logique, il faudra limiter la taille de vos troupeaux à 25 bêtes maximum au même endroit. Sinon leurs IAs cumulées engendreront aussi des ralentissements.`,
      ]}
    />
  </>
);

export default InstancesRules;
