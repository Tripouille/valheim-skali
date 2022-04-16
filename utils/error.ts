import axios from 'axios';

const ERROR_STATUS_TO_MESSAGE: Record<number, string> = {
  400: 'Erreur du serveur : Requête incorrecte (400)',
  401: "Erreur du serveur : Vous n'avez pas l'autorisation",
  404: 'Erreur du serveur (404)',
  500: 'Erreur du serveur',
};

export const getMessageFromError = (error: unknown): string =>
  axios.isAxiosError(error) && error.response
    ? ERROR_STATUS_TO_MESSAGE[error.response.status] ??
      `Erreur du serveur (${error.response.status})`
    : 'Erreur inconnue';
