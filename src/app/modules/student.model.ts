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
import bcrypt from 'bcrypt'
import config from '../config';

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
  password:{type:String, required:[true, 'password is required'], maxlength:[20, 'password can not be more than 20 character']},
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
  isDeleted : {
    type:Boolean,
    default:false
  }
},{
  toJSON:{
    virtuals: true,

  }
});

// virtual--> this data is not exist in the database it is shwon by using other data in database
studentSchema.virtual('fullName').get(function(){
  return(
    `${ this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
  )
})

// creating a a custom static method
studentSchema.statics.isUserExists = async function(id:string) {
  
  return this.findOne({id})
}

// creating a custom instance method-->
// studentSchema.methods.isUserExists = async function(id:string){
//     const existingUser = await StudentModel.findOne({id});
//     return existingUser;
// }


//pre save middleware/ hook--> will work on create() save() method
studentSchema.pre('save',async function(next){
  console.log(this, 'pre hook: we will save the data')

  // hashing password and save into db
  const user = this; //document
  user.password=await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
  next()
})
// post save middleware/hook
studentSchema.post('save', function(doc, next){
  doc.password = ''
  next()
})
// query middleware
studentSchema.pre('find', function(next){
  this.find({isDeleted:{$ne:true}})
  next()
})

studentSchema.pre('findOne', function(next){
  this.find({isDeleted:{$ne:true}})
  next()
})

studentSchema.pre('aggregate', function(next){
  this.pipeline().unshift({$match:{isDeleted:{$ne:true}}})
  next()
})









// create a model -->
export const Student = model<TStudent,StudentModel>('Student', studentSchema); 
//TStudentModel
