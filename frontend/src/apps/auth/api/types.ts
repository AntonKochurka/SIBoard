export interface UserEntity {

}

export interface ObtainPairRequest {
    identifier: string;
    password: string;
}

export interface ObtainPairResponse {
    access: string;
    refresh: string;
}