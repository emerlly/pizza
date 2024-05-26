import prismaClient from "../../prisma";
import { compare } from 'bcryptjs'

interface AuthRequest{
  email: string;
  password: string;
}


class AuthUserService{
  async execute({ email, password }: AuthRequest){
    //Verificar se o email existe.
    const user = await prismaClient.user.findFirst({
      where:{
        email: email
      }
    })

    if(!user){
      throw new Error("Usuário ou senha incorreto")
    }

    // preciso verificar se a senha que ele mandou está correta.
    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch){
      throw new Error("Usuário ou senha incorreto")
    }


    // gerar um token JWT e devolver os dados do usario como id, name e email


    return { ok: true }
  }
}

export { AuthUserService };