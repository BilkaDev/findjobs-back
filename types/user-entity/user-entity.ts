export * from './user-entity';

export interface NewUserEntity extends Omit<UserEntity, 'id'> {
    id?: string;
}


//refund item
export interface UserEntity {
    id: string;
    name: string;
    email: string;
    password: string;
}


