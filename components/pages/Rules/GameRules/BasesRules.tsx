import IconList from 'components/core/DataDisplay/IconList';
import Paragraphs from 'components/core/Typography/Paragraphs';
import Text from 'components/core/Typography/Text';

const BasesRules = () => {
  return (
    <>
      <Paragraphs
        paragraphs={[
          'Le serveur est gros et a beaucoup de joueurs, c’est ce qui est chouette, mais c’est aussi un risque. Au Valhabba, vous pouvez (devez) construire des balises dans votre base pour la protéger. Une balise désactivée permet à n’importe qui de s’inscrire dessus. Une balise activée vous permet de privatiser un cercle de 40 mètres de diamètre. Pour faire quoique ce soit dans cette limite, un joueur doit obligatoirement être inscrit sur la balise. Si ce n’est pas le cas, il ne peut pas prendre de portail, ouvrir des coffres, utiliser les ateliers, ramasser des objets, etc., etc. Ça vous permettra de sécuriser les installations de vous et votre équipe.',
          'En plus de tout ça, si personne de votre équipe n’est connecté, les balises rendent invincibles toutes les constructions qu’elles couvrent. Vous pouvez donc vous déconnecter l’esprit tranquille.',
        ]}
      />
      <Text>
        Chaque joueur a le droit à <strong>3 balises maximum</strong> dans le serveur. Par contre,
        si aucun joueur n’interagit avec la balise durant un mois, elle se désactivera d’elle-même
        et vous en perdrez ses bénéfices.
      </Text>
      <Text mt={3} mb={2}>
        Attention tout de même à deux choses :
      </Text>
      <IconList
        list={[
          'Si vous placez une balise quelque part, n’oubliez pas que vous bloquerez la zone pour les autres. Donc faites attention au lieu public et aux détroits.',
          'Si vous utilisez le portail d’un autre joueur, assurez-vous d’avoir son accord avant. Sinon, vous risquez d’atterrir dans une base et de ne pas pouvoir faire machine arrière à cause de la balise.',
        ]}
      />
      <Text mt={4} mb={2}>
        Quelques dernières choses vis-à-vis des bases :
      </Text>
      <IconList
        list={[
          'Essayez de contacter vos futurs voisins avant de vous installer. Si vous vous établissez trop près d’eux, les instances de votre base se cumulent aux leurs.',
          'Par fair-play, il est interdit de cacher sa base derrière des fossés ou des murailles de terre. Vous incarnez un viking par Odin. Face aux monstres, sortez les armes ou érigez des murs (destructibles), mais n’exploitez pas les limites du jeu.',
        ]}
        mb={5}
      />
      <Paragraphs
        paragraphs={[
          "Et pour finir, vous êtes ici, dans le dixième royaume, pour prouver votre valeur à Odin pas à Loky. Faire le filou ne sera pas bien vu, abuser des mécaniques du jeu non plus. En gros, tout ce qui vous permet d’obtenir des ressources sans effort est interdit. Par exemple, les fermes automatiques (des constructions tuant les monstres automatiquement), ou l’abus des monstres d’un biome pour tuer ceux d’un autre. Il n’est pas interdit d’être astucieux bien sûr, mais il faut juste rester fair-play par rapport aux autres joueurs. Et si vous trouvez un gros raccourci dans le jeu, il n'est probablement pas fair-play.",
        ]}
      />
      <br />
      <Paragraphs
        paragraphs={[
          'En tout cas bravo, vous êtes parvenu au bout de l’essentiel du règlement !',
          'Jetez maintenant un coup d’œil à nos guides de jeu pour des exemples plus concrets, des idées d’activités/quêtes/objectifs à faire chez nous et quelques petites règles supplémentaires. Après quoi vous pourrez (enfin) candidater chez nous. La candidature consiste à remplir un questionnaire sur notre règlement (comme à l’école o/) et ensuite à rejoindre notre discord pour poser vos questions à un de nos membres et enfin nous rejoindre !',
          'Pour les streameurs, il y a un règlement de plus à lire (^-^)’',
        ]}
      />
    </>
  );
};

export default BasesRules;
