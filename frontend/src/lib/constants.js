
export const    BASEURL  =  import.meta.env.MODE === "development" ? "http://localhost:8080/api/v1": "/api/v1"


export const getLanguageId = (languageName)=>{
    const supportedLanguase =  {
        "JavaScript":63,
         "Python":71,
        "C++":10
    }
    return supportedLanguase[languageName]
}


