
import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/multer'

//Controllers
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';

// MiddleWares
import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateProductController } from './controllers/produtc/CreateProductController';


const router = Router();
const upload = multer(uploadConfig.upload("./tmp"))

// Rotas de Users
router.post('/users', new CreateUserController().handle)
router.post('/login', new AuthUserController().handle)
router.get('/me', isAuthenticated, new DetailUserController().handle)

// Rotas Categories
router.post('/category', isAuthenticated, new CreateCategoryController().handle)
router.get('/category', isAuthenticated, new ListCategoryController().handle)


// Rotas Products
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)

export { router };