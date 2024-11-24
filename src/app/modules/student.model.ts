import { Schema, model } from 'mongoose';
// import validator from 'validator';
import  {
  TStudent,
  TLocalGuardian,
  TUserName,
  TGuardian,
  StudentModel,
  // TStudentModel,
  // TStudentMethods,
} from './student/student.interface';
// StudentModel as student

// schema created-->
const userNameSchema = new Schema<TUserName>({
  firstName: { 
    type: String,
    required: [true, "bhai first name lagbei lagbe"],
    trim:true, 
    maxlength:[20, 'First Name can not be more than 20 character'] ,
    // validate: {
    //     validator:function(value: string){
    //         const firstName = value.charAt(0).toUpperCase()+value.slice(1);
    //         return firstName === value;
    //     },
    //     message: '{VALUE} is not in capitalize format'
    // }
},
  middleName: { 
    type: String,
    trim:true, 
 },
  lastName: { 
    type: String,
    trim:true,  
    required: [true, "bhai last name lagbei lagbe"],
    // using validator
    // validate:{
    //     // isAlpha --> prevent the numeric value in last name
    //     validator:(value: string)=> validator.isAlpha(value),
    //     message: '{VALUE} is not valid'
    // } 
},
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const studentSchema = new Schema<
                       TStudent,
                      //  TStudentModel,
                      //  TStudentMethods,
                       StudentModel
                       >({
  id: { type: String , required:true, unique:true},
  name: {
    type:userNameSchema,
    required:true
  },
  gender: {
    type:String,
    enum:{
        values:['male', 'female'],
        message:"{VALUE} is not valid gender"
    },
    required: true
  },
  dateOfBirth: { type: String },
  email: { 
    type: String, 
    required: [true, 'Email is required'] , 
    unique:true,
    // validate:{
    //     validator:(value:string)=> validator.isEmail(value),
    //     message:'{VALUE} is not a valid email'
    // }
},
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type:String,
    enum:['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'],
    required:true
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    type:guardianSchema,
    required:true
  },
  localGuardian: {
    type:localGuardianSchema,
    required:true
  },
  profileImage: { type: String },
  isActive: {
    type:String,
    enum:['active', 'block'],
    default:'active'
  },
});

// creating a a custom static method
studentSchema.statics.isUserExists = async function(id:string) {
  
  return this.findOne({id})
}

// creating a custom instance method-->
// studentSchema.methods.isUserExists = async function(id:string){
//     const existingUser = await StudentModel.findOne({id});
//     return existingUser;
// }


// create a model -->
export const Student = model<TStudent,StudentModel>('Student', studentSchema); 
//TStudentModel
