import Paragraphs from 'components/core/Typography/Paragraphs';

const PvPRules = () => {
  return (
    <Paragraphs
      paragraphs={[
        'Nous ne sommes PAS un serveur sur lequel on combat n’importe qui n’importe comment. Si un joueur ne souhaite pas combattre ou interagir avec vous, c’est son droit et il faut le respecter. Par contre, dès qu’il y a consentement, vous êtes complètement libre de faire des duels, des championnats ou des guerres (pour les guerres, prévenez l’équipe d’admin avant).',
        'Le PvP couvre toutes les interactions entre les joueurs, directes ou non. Toucher à la base d’un autre joueur, c’est du PvP, pareil pour ses ateliers, ses bêtes, ses fermes, sa tombe, etc.',
        'Attention au PvP indirect :',
        '- les monstres : vous les réveillez en approchant de la base de quelqu’un.',
        '- les lieux d’intérêt public : donjons, cryptes, boss, camps de monstres, PNJ, lieux de quêtes, etc. doivent rester accessibles à tous.',
        'C’est important de garder tout ça en tête. On ne peut pas jouer sur un serveur avec une centaine d’autres joueurs comme si on était sur une partie solo.',
        'Et c’est tout particulièrement vrai pour vos constructions.',
      ]}
    />
  );
};

export default PvPRules;
