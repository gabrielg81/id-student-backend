import { Router } from "express";
import { CreateCourse } from "../controllers/course/createCourse";
import { ListCourseController } from "../controllers/course/listAllCourse";
import { RegisterProCareerController } from "../controllers/procareer/createProCareer";
import { ListProCareerController } from "../controllers/procareer/listProCareer";
import { RegisterSchoolHistoryController } from "../controllers/schoolhistory/createSchoolHistory";
import { ListSchoolHistoryController } from "../controllers/schoolhistory/listSchoolHistory";
import { CreateSemester } from "../controllers/semester/createSemester";
import { ListSemesterController } from "../controllers/semester/listAllSemester";
import { CheckController } from "../controllers/student/check";
import { ListStudentController } from "../controllers/student/listAll";
import { LoginController } from "../controllers/student/login";
import { RegisterStudentController } from "../controllers/student/registerStudent";

const router = Router();

const login = new LoginController();
const check = new CheckController();

const registerStudent = new RegisterStudentController();
const createCourse = new CreateCourse();
const createProCareer = new RegisterProCareerController();
const createSchoolHistory = new RegisterSchoolHistoryController();
const createSemester = new CreateSemester();

const listStudent = new ListStudentController();
const listallcourse = new ListCourseController();
const listallsemester = new ListSemesterController();
const listschoolhistory = new ListSchoolHistoryController();
const listprocareer = new ListProCareerController();

//#region endpoint access system
router.post("/login", login.handle);
router.post("/check", check.handle);
//#endregion

//#region endpoints id student
router.post("/register", registerStudent.handle);
router.post("/course", createCourse.handle);
router.post("/semester", createSemester.handle);

router.get("/students-all", listStudent.handle);
router.get("/course-all", listallcourse.handle);
router.get("/semester-all", listallsemester.handle);
//#endregion

//#region endpoints egressos
router.post("/procareer", createProCareer.handle);
router.post("/schoolhistory", createSchoolHistory.handle);

router.get("/procareer-all", listprocareer.handle);
router.get("/schoolhistory-all", listschoolhistory.handle);
//#endregion

export { router };