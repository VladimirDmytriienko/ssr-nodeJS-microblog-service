const yup = require('yup');

const userValidation = async (req, res, next) => {
    const schema = yup.object({
        email: yup.string().email().required(),
        password: yup.string().required() 
    });
    try {
        await schema.validate(req.body);
        next();
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = { userValidation };

