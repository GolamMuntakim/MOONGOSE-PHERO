import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import Joi from 'joi';

const createStudent = async (req: Request, res: Response) => {
  try {
    // creating a schema validation using joi
    const JoivalidationSchema =  Joi.object({
        id : Joi.string(),
        name:{
            firstName: Joi.string().max(20).required(),
            middleName: Joi.string().max(20),
            lastName: Joi.string().max(20)
        },
        gender: Joi.string().required().valid(['male', 'female'])
    })


    const { student: studentData } = req.body;
    // will call service function to send this data
    const result = await StudentServices.createStudentIntoDB(studentData);
    // send response to the user
    res.status(200).json({
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
        success: false,
        message: 'something went wrong',
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
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
  }
};
export const studentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
