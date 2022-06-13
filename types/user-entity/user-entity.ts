export * from './user-entity';

export interface NewUserEntity extends Omit<UserEntity, 'id'> {
    id?: string;
}
export interface LoginUserEntity extends Omit<UserEntity, 'id'|'name'> {
    id?: string;
    name?: string;
}


//refund item
export interface UserEntity extends SimpleUserEntity{
    password: string;
}
export interface SimpleUserEntity {
    id: string;
    name: string;
    email: string;
}


