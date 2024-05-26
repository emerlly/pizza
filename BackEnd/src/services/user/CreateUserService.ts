import { hash } from "bcryptjs";
import prismaClient from "../../prisma";


interface UserRequest{
    name: string;
    email: string;
    password: string;
}


class CreateUserService{
    async execute({name, email, password }: UserRequest){
        // validar se email foir enviado
        if(!email){
            throw new Error("Email Incorreto")
        }
        //validar se email nao existe
        const userAlreadyExistis = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })
        if(userAlreadyExistis){
            throw new Error("Usuário ja cadastrado!")
        }

        //cadastra user
        const passwordHashed = await hash(password, 8);

        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHashed
            },
            select:{
                id: true,
                email: true,
                name: true
            }
        })
        return user
    }
}

export { CreateUserService }