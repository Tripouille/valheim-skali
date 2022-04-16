import { AuthError } from 'utils/auth';

export const getAuthErrorMessage = (error: string): string => {
  switch (error) {
    case AuthError.CALLBACK:
      return "Il y a eu un problème avec l'authentification ; ou bien vous avez annulé votre connexion, dans ce cas il n'y a pas de problème :)";
    case AuthError.SESSION_REQUIRED:
      return "Vous n'êtes pas autorisé à visiter cette page. Veuillez vous connecter.";
    default:
      return "Il y a eu un problème avec l'authentification. Réessayez ou contactez le propriétaire du site.";
  }
};
