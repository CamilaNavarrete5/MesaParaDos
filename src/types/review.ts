export type ReviewRatings = {
  service?: number;   // Atención
  place?: number;     // Lugar
  ambience?: number;  // Ambiente
  value?: number;     // Precio/Calidad
};

export type Review = {
  id: number;
  title: string;
  slug:string;
  rating: number;        
  description: string;
  userName: string;
  imageSrc: string;
  userAvatarSrc: string;
  createdAt: string;
  //ubicacion
  location?: string;
  province?: string;
  city?: string;
  neighborhood?: string;

  category?: string;
  
  ratings?: ReviewRatings;
  gallery?: string[]; 

  petFriendly?: boolean;
};
