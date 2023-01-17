import Figure from 'components/core/Images/Figure';
import ZoomableImage from 'components/core/Images/ZoomableImage';
import Paragraphs from 'components/core/Typography/Paragraphs';

const TerrainRules = () => {
  return (
    <>
      <Paragraphs
        paragraphs={[
          'En très (trop?) bref : C’est mal, voilà !',
          'En moins bref : Faire la moindre modification du terrain, c’est perdre définitivement une instance sur la zone. Dans Valheim, si vous donnez un coup de pioche, ça ajoute une instance, si vous rebouchez avec la houe, c’est une instance de plus, si vous donnez un coup de houe pour aplatir, c’est une instance de plus aussi. Ça part très vite et seuls les admins peuvent vraiment réinitialiser une zone.',
          "Au Valhabba, il est donc interdit de terraformer (c'est-à-dire modifier le terrain) hors de sa base principale. Et dans votre base principale, on vous encourage à le limiter au maximum. Construisez sur pilotis par exemple. Les plus belles bases sont celles qui épouse le terrain de toutes manières :D",
          'Pour les minerais, notamment le cuivre, la règle est la même : pas de terraformage hors de sa base. Vous devez donc vous contenter de la partie hors du sol des minerais. C’est pareil pour le goudron. Vider les flaques comme dans une partie solo rendrait la carte laide et injouable pour les autres, ne le faites pas, il y a d’autres manières d’en obtenir.',
          'Rassurez-vous, les minerais réapparaissent régulièrement. La seule et unique exception concerne le minerai d’argent. Là, vous pouvez creuser hors de votre base, mais essayez de garder votre trou le plus petit possible par respect pour les prochains joueurs.',
        ]}
      />
      <Figure
        legend="Voilà, typiquement, ce qu’on veut éviter."
        display="block"
        textAlign="center"
        mt={5}
      >
        <ZoomableImage
          data-cy="abusive-mining"
          src="https://cdn.discordapp.com/attachments/879308268034482176/880075448187498496/7SbpNZOU8PFVmknCFk_g45ENGtjFaoopyVdENgivvJi2V3nXG4IOrT2YTgm6qCPth7EgKdtZqXz-P_LZNnXzPUMAHLZhvxUQ8AEl.png"
          alt="Minage abusif"
          width={550}
          height={200}
          objectFit="cover"
          objectPosition="top"
        />
      </Figure>
    </>
  );
};

export default TerrainRules;
