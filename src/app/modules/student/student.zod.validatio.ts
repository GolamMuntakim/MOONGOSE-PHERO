import { z } from "zod";
// UserName Schema
const userNameValidationSchema = z.object({
    firstName: z
      .string()
      .min(1, "First name is required")
      .max(20, "First name cannot exceed 20 characters")
      .trim(),
    middleName: z.string().optional(),
    lastName: z
      .string()
      .min(1, "Last name is required")
      .trim(),
  });
  
  // Guardian Schema
  const guardianValidationSchema = z.object({
    fatherName: z.string().min(1, "Father's name is required"),
    fatherOccupation: z.string().min(1, "Father's occupation is required"),
    fatherContactNo: z.string().min(1, "Father's contact number is required"),
    motherName: z.string().min(1, "Mother's name is required"),
    motherOccupation: z.string().min(1, "Mother's occupation is required"),
    motherContactNo: z.string().min(1, "Mother's contact number is required"),
  });
  
  // Local Guardian Schema
  const localGuardianValidationSchema = z.object({
    name: z.string().min(1, "Local guardian's name is required"),
    occupation: z.string().min(1, "Local guardian's occupation is required"),
    contactNo: z.string().min(1, "Local guardian's contact number is required"),
    address: z.string().min(1, "Local guardian's address is required"),
  });
  
  // Student Schema
  const studentValidationSchema = z.object({
    id: z.string().min(1, "Student ID is required"),
    password: z.string().max(20),
    name: userNameValidationSchema,
    gender: z.enum(["male", "female"], {
      errorMap: () => ({ message: "Gender must be either 'male' or 'female'" }),
    }),
    dateOfBirth: z.string().optional(),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email format"),
    contactNo: z.string().min(1, "Contact number is required"),
    emergencyContactNo: z.string().min(1, "Emergency contact number is required"),
    bloodGroup: z.enum(
      ["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"],
      {
        errorMap: () => ({
          message: "Invalid blood group. Must be one of 'A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'",
        }),
      }
    ),
    presentAddress: z.string().min(1, "Present address is required"),
    permanentAddress: z.string().min(1, "Permanent address is required"),
    guardian: guardianValidationSchema,
    localGuardian: localGuardianValidationSchema,
    profileImage: z.string().optional(),
    isActive: z.enum(["active", "block"]).default("active"),
    isDeleted:z.boolean()
  });


  export default studentValidationSchema;