import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.zod.validatio';
// import studentValidationSchema from './student.validation';


const createStudent = async (req: Request, res: Response) => {
  try {
    // creating schema validation using zod
    const { student: studentData } = req.body;

    // data validation using joi
    // const {error,value} = studentValidationSchema.validate(studentData)

    //data validation using zod
    const zodParseData = studentValidationSchema.parse(studentData)

    // will call service function to send this data
    const result = await StudentServices.createStudentIntoDB(zodParseData);

    // if(error){
    //     res.status(500).json({
    //         success: false,
    //         message: 'something went wrong',
    //         error: error.details,
    //       });
    // }
   
    // send response to the user
    res.status(200).json({
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });
  } catch (error:any) {
    res.status(500).json({
        success: false,
        message: error.message || 'something went wrong',
        error: error,
      });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Students are retrive succesfully',
      data: result,
    });
  } catch (error : any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentsFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Students is retrive succesfully',
      data: result,
    });
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    });
  }
};

const deleteStudent = async(req:Request, res:Response)=>{
  try {
    const {studentId} = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId)
    res.status(200).json({
      success:true,
      message:'Student is deleted succesfully',
      data:result
    })
  } catch (error:any) {
    res.status(500).json({
      success:false,
      message:error.message || "something went wrong",
      error : error
    })
  }
}
export const studentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent
};
