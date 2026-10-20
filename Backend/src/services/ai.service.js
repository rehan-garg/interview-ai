const {GoogleGenAI} = require('@google/genai')

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

module.exports = invokeGeminiAI