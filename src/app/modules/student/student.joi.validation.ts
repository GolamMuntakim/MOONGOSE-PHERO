import Joi from 'joi';
  // creating a schema validation using joi
  const userNameSchema  = Joi.object({
    firstName: Joi.string()
               .trim()
               .max(20)
               .regex(/^[A-Z][a-zA-Z]*$/).message('First name start with a capital letter and contain only letters')
               .required(),
    middleName: Joi.string().trim().optional(),
    lastName: Joi.string().trim().regex(/^[a-zA-Z]+$/).required()
});
const guardianSchema = Joi.object({
    fatherName: Joi.string().required(),
    fatherOccupation: Joi.string().required(),
    fatherContactNo: Joi.string().required(),
    motherName: Joi.string().required(),
    motherOccupation: Joi.string().required(),
    motherContactNo: Joi.string().required(),
});
const localGuardianSchema = Joi.object({
    name: Joi.string().required(),
    occupation: Joi.string().required(),
    contactNo: Joi.string().required(),
    address: Joi.string().required(),
});
const studentValidationSchema = Joi.object({
    id: Joi.string().required(),
    name: userNameSchema.required(),
    gender: Joi.string().valid('male','female').required(),
    dateOfBirth:Joi.string().isoDate().optional(),
    email:Joi.string().email().required(),
    contactNo:Joi.string().required(),
    emergencyContactNo: Joi.string().required(),
    bloodGroup:Joi.string().valid('A+','A-','AB+','AB-','B+','B-','O+','O-').required(),
    presentAddress: Joi.string().required(),
    permanentAddress:Joi.string().required(),
    guardian: guardianSchema.required(),
    localGuardian: localGuardianSchema.required(),
    profileImage: Joi.string().uri().optional(),
    isActive: Joi.string().valid('active', 'block').default('active')
})     

export default studentValidationSchema;