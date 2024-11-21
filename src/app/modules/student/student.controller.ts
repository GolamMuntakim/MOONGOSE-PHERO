import { Request, Response } from "express"
import { StudentServices } from "./student.service"

const createStudent = async(req:Request, res:Response) =>{
    try {
        const {student: studentData} = req.body
        // will call service function to send this data
        const result = await StudentServices.createStudentIntoDB(studentData)
        // send response to the user 
        res.status(200).json({
            success : true,
            message : 'Student is created succesfully',
            data:result
        }) 
    } catch (error) {
        console.log(error)
    }
}

export const studentControllers = {
    createStudent,
}