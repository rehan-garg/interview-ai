const {GoogleGenAI} = require('@google/genai')
const {z} = require('zod')

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

async function invokeGeminiAI() {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash-lite",
            contents: "Hello gemini, explain what is interview",
        })
    
        console.log(response.text)
    } catch (error) {
        console.log("Error in using ai service. Please try again later !! ", error)
    } finally {
        console.log("Tried calling ai service")
    }
}


const interviewReportSchema = z.object({
    matchScore: z.number().min(0).max(100).describe("A score between 0 to 100 indicating how well a candidate's profile matches with the job description and how well the candidate is aligned in terms of skills for the job"),

    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question that can be asked in an interview"),
        intention: z.string().describe("The intention of interviewer behind asking this particular question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take")
    }).strict()).describe("The technical questions that can be asked in an interview along with their intention and how to answer them"),

    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question that can be asked in an interview"),
        intention: z.string().describe("The intention of interviewer behind asking this particular question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take")
    }).strict()).describe("The behavioral questions that can be asked in an interview along with their intention and how to answer them"),

    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of the skill gap i.e., low, medium or high")
    }).strict()).describe("The list of skill gaps in the candidate's resume along with their severity"),

    preparationPlan: z.array(z.object({
        day: z.number().int().min(1).describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus on this day in the preparation plan prepared for the candidate"),
        tasks: z.array(z.string().min(1)).min(1).describe("At least one specific task to complete on this day")
    }).strict()).describe("A day-wise preparation plan for the candidate to follow to get the job")
}).strict()

async function generateInterviewReport({resume, selfDescription, jobDescription}) {

    const prompt = `Generate an interview report as JSON for the candidate with following details.
    For every day in preparationPlan, include at least three specific, actionable tasks in the tasks array. Never return an empty tasks array.
    Resume: ${resume},
    Self Description: ${selfDescription},
    Job Description: ${jobDescription}`

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash-lite",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseJsonSchema: z.toJSONSchema(interviewReportSchema, {target: "draft-07"})
            }
        })

        const report = interviewReportSchema.parse(JSON.parse(response.text))
        console.log(JSON.stringify(report, null, 2))
        return report
    } catch (error) {
        console.error("There was an error in generating the report from Gemini:", error)
        throw error
    }
}

module.exports = generateInterviewReport