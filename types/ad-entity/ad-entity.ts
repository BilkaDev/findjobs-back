export * from './ad-entity';

export interface NewAdEntity extends Omit<AdEntity, 'id'> {
  id?: string;
}

export interface SimpleAdEntity {
  id: string;
  creatorId: string;
  lat: number;
  lon: number;
  name: string;
  image: string;
  title: string;
  address: string;
  salaryMin: number;
  salaryMax: number;
  technology: string;
  email: string;
  date: Date;
}

export interface AdEntity extends SimpleAdEntity {
  description: string;
}
