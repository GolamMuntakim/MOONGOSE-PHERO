import express from 'express';
import { studentControllers } from './student.controller';

const router = express.Router();

// will call controller function -->
router.post('/create-student', studentControllers.createStudent);
router.get('/get-students', studentControllers.getAllStudents);
router.get('/:studentId', studentControllers.getSingleStudent);
router.delete('/:studentId', studentControllers.deleteStudent)
export const StudentRoutes = router;
