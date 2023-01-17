import Paragraphs from 'components/core/Typography/Paragraphs';

const StreamingRules = () => (
  <>
    <Paragraphs
      paragraphs={[
        'La seule condition que nous mettons aux streams en direct est… le consentement des personnes enregistrées.',
        'Vous streamez quand vous voulez, et où vous voulez, dès lors que :',
        "1. Tous les joueurs qui apparaissent à votre écran vous ont donné leur accord. Si vous tombez sur quelqu'un par inadvertance, mettez simplement dans le tchat “Tu apparais en direct dans mon stream, ça ne te gêne pas?”. Ou autre chose dans le même genre, mais pas ambigüe. Si ça gêne effectivement la personne, à vous de recadrer votre stream.",
        '2. Vous êtes dans le canal vocal "Stream en direct". Si d’autres joueurs vous y rejoignent, ils acceptent tacitement d’être enregistrés (rappelez-leur quand même au cas où).',
        '3. Vous changez votre pseudo discord et lui accolez un petit 📽 (clic droit, changez le pseudo).',
        '4. Vous ne montrez pas votre écran de connexion au serveur (et donc son IP et mot de passe) ainsi que notre discord.',
      ]}
    />
  </>
);

export default StreamingRules;
