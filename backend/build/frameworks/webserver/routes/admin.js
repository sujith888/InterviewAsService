"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminImplementation_1 = require("../../database/Postgres/repositories/Admin/adminImplementation");
const adminRepostories_1 = require("../../../application/repositories/Admin/adminRepostories");
const adminServices_1 = require("../../services/adminServices");
const adminService_1 = require("../../../application/services/adminService");
const adminControllers_1 = __importDefault(require("../../../adapters/controllers/Admin/adminControllers"));
const adminRouter = () => {
    const controller = (0, adminControllers_1.default)(adminRepostories_1.adminRepositoryInterface, adminImplementation_1.adminRepositoryImplementation, adminService_1.adminServiceInterface, adminServices_1.adminServiceImplementation);
    const router = express_1.default.Router();
    router.get("/view_request", controller.getAllRequest);
    router.get("/student_details/:id", controller.getStudentCVDetails);
    router.get("/view_demo", controller.getDemoRequest);
    router.get("/confirm_mail/:email", controller.sendConfirmationMail);
    router.post("/add_plans", controller.postSubscriptionPlans);
    router.get("/view_plans", controller.getFullPlans);
    router.delete("/delete_plan/:id", controller.deletePlan);
    router.put("/edit_plans", controller.editPlans);
    router.get("/addtime_slot/:id", controller.assignInterviwer);
    router.get("/timeslot_details", controller.getAllTimeSlotDetails);
    router.get("/interview_experts", controller.getAllInterviewerRequest);
    router.get("/interviewer_emailconfirmation/:email", controller.interviewerEmailConfirmation);
    router.delete("/sent_rejectionmail/:email/:id", controller.sentEmailRejection);
    router.post("/assign_interview", controller.postAssignInterviewer);
    router.get("/scheduled_interviews", controller.getAllScheduledInterviews);
    router.post("/cancel_Interview", controller.cancelInterview);
    router.get("/cancelled_Interviews", controller.cancelledInterViews);
    router.get("/subscriptioncount", controller.daywiseSubscriptionCount);
    router.get("/monthly_subscriptioncount", controller.monthlySubscriptionCount);
    router.get("/total_clientcount", controller.totalClientCount);
    router.get("/full_subscriptionhistory/:companyId", controller.fullSubscriptionHistory);
    router.get("/check_interviewstatus/:companyId", controller.checkInterviewStatus);
    return router;
};
exports.default = adminRouter;
