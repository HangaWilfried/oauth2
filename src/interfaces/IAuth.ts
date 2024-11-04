import { 
    CredentialDto, 
    CreateUserDto, 
    PayloadDto,
} from "@/dtos";

export interface IAuth {
    doLogin(credential: CredentialDto): Promise<Record<string, string>>;

    validateUser(credential: CredentialDto): Promise<PayloadDto | null>

    doCreateAccount(user: CreateUserDto): Promise<void>;
}