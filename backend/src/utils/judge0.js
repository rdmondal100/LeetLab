import axios from "axios"
import { asyncHandler } from "./async-handler.js"

export const getJudge0LanguageId = (languageName) => {
    const languageMap = {
        "PYTHON": 71,
        "JAVA": 62,
        "JAVASCRIPT": 63
    }
    return languageMap[languageName.toUpperCase()]
}

export const submitBatch = async(submissions)=>{
    const {data} = await axios.post(`${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,{
        submissions
    })

    console.log("Submission Results: ",data)

    return data //array of tokens


}



const sleep = (seconds)=>{
    console.log(seconds)
    return new Promise((resolve)=>setTimeout(resolve,seconds*1000))
}


export const pollBatchResults = async (tokens) => {
    const MAX_RETRIES = 15;
    const DELAY_SECONDS = 2;
    let attempts = 0;

    while (attempts < MAX_RETRIES) {
        const { data } = await axios.get(`${process.env.JUDGE0_API_URL}/submissions/batch`, {
            params: {
                tokens: tokens.join(','),
                base64_encoded: false,
                fields: 'stdout,stderr,compile_output,status,memory,time'
            }
        });

        const results = data.submissions;
        const isAllDone = results.every(r => r.status.id >= 3); 
        

        if (isAllDone) return results;

        await sleep(DELAY_SECONDS);
        attempts++;
    }

    throw new ApiError(408, 'Timeout: Judge0 did not return results in time.');
};


export const getLanguageName = (langId)=>{
    const  LANGUAGE_NAMES = {
        74: "TypeScript",
        63:"JavaScript",
        71: "Python",
        62: "Java"
    }

    return LANGUAGE_NAMES[langId]
}