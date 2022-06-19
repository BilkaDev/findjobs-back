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
    token?: string | null;
}
export interface SimpleUserEntity {
    id: string;
    name: string;
    email: string;
}
export interface UserLoginRes {
    id: string;
    name: string;
    email: string;
    token: string;
}


