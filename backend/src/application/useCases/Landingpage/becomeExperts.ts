import { HttpStatus } from "../../../types/httpStatus";
import { FormValues } from "../../../types/interviewExperts";
import AppError from "../../../utils/appError";

import { becomeInterviewexpertsDbInterface } from "../../repositories/Landingpage/BecomeExpertInterface";



 export const interviewExperts=async(
  formData:FormValues,
  InterviewExpertDbRepository: ReturnType<becomeInterviewexpertsDbInterface>,

 )=>{
  const response= InterviewExpertDbRepository.becomeInterviewExperts(formData)
  return response
 } 

 export const  authenticateInterviewToken =async(interviewToken:string,InterviewExpertDbRepository: ReturnType<becomeInterviewexpertsDbInterface>)=>{

    return InterviewExpertDbRepository.valiadteToken(interviewToken)

 }
