import { Schema, model } from 'mongoose';
import {
  Student,
  LocalGuardian,
  UserName,
  Guardian,
} from './student/student.interface';

// schema created-->
const userNameSchema = new Schema<UserName>({
  firstName: { type: String, required: [true, "bhai first name lagbei lagbe"] },
  middleName: { type: String },
  lastName: { type: String, required: [true, "bhai last name lagbei lagbe"] },
});

const guardianSchema = new Schema<Guardian>({
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

const localGuardianSchema = new Schema<LocalGuardian>({
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

const studentSchema = new Schema<Student>({
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
  email: { type: String, required: true , unique:true},
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

// create a model -->
export const StudentModel = model<Student>('Student', studentSchema);
