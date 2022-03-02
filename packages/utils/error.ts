import axios from 'axios';

const ERROR_STATUS_TO_MESSAGE: Record<number, string> = {
  401: "Erreur du serveur : Vous n'avez pas l'autorisation",
  500: 'Erreur du serveur',
};

export const getMessageFromError = (error: unknown): string =>
  axios.isAxiosError(error) && error.response
    ? ERROR_STATUS_TO_MESSAGE[error.response.status] ?? 'Erreur de connexion au serveur'
    : 'Erreur inconnue';
