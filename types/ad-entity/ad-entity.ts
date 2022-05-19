export * from './ad-entity'

export interface NewAdEntitiy extends Omit<AdEntity, 'id'> {
    id?: string
}


//refund item
export interface SimpleAdEntity {
    id: string;
    lat: number;
    lon: number;
}

export interface AdEntity extends SimpleAdEntity {
    name: string;
    image: string;
    title: string;
    address: string;
    salaryMin: number;
    salaryMax: number;
    technology: string;
}
