import { body, validationResult, param } from "express-validator";


export const validationResultExpress = (req, res, next)=>{
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    next();
};


export const bodyRegisterValidator = [
    body('nombre', 'Ingrese un nombre válido')
        .trim()
        .notEmpty(),
    body('apellido', 'Ingrese un apellido válido')
        .trim()
        .notEmpty(),
    body('username','Ingrese un nombre válido')
        .trim()
        .notEmpty(),
    body('password', 'Mínimo 8 caracteres')
        .trim()
        .isLength({min: 8}),
    body('password', 'Formato de password incorrecto')
        .custom((value, {req})=>{
            if(value !== req.body.repassword) {
                throw new Error('No coinciden las contraseñas')
            }

            return value;
        }),
    validationResultExpress,
];

export const bodyLoginValidator = [
    body('username','Ingrese un nombre válido')
        .trim()
        .notEmpty(),
    body('password', 'Password incorrecto')
        .trim()
        .isLength({min: 8}),
    
    validationResultExpress

];