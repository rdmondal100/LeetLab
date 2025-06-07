import axios from "axios"
import { asyncHandler } from "./async-handler.js"
import { ApiError } from "../utils/api-error.js";
console.log(process.env.RAPIDAPI_KEY)
export const getJudge0LanguageId = (languageName) => {
    const languageMap = {
        "PYTHON": 71,
        "C++": 54,
        "JAVASCRIPT": 63
    }
    return languageMap[languageName.toUpperCase()]
}

export const submitBatch = async (submissions) => {
    console.log(submissions)
    const { data } = await axios.post(`${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`, {
        submissions
    }, {
        headers: {
            'x-rapidapi-key':  process.env.RAPIDAPI_KEY,
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
            'Content-Type': 'application/json'
        }
    })

    console.log("Submission Results: ", data)

    return data //array of tokens


}



const sleep = (seconds) => {
    console.log(seconds)
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000))
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
    },
    headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
        'Content-Type': 'application/json'
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


export const getLanguageName = (langId) => {
    const LANGUAGE_NAMES = {
        63: "JavaScript",
        71: "Python",
        54: "C++"
    }

    return LANGUAGE_NAMES[langId]
}