export type ReviewRatings = {
  service?: number;   // Atención
  place?: number;     // Lugar
  ambience?: number;  // Ambiente
  value?: number;     // Precio/Calidad
};

export type Review = {
  id: number;
  title: string;
  rating: number;        // promedio general (si lo tenés)
  description: string;
  userName: string;
  imageSrc: string;
  userAvatarSrc: string;
  createdAt: string;

  // Nuevos
  location?: string;
  category?: string;
  ratings?: ReviewRatings;
  content?: string[];     // párrafos
  gallery?: string[];     // rutas a imágenes
};
