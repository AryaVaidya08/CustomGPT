import Replicate from "replicate";


async function getResponse(promptInput) {
    console.log("Running API")
    const replicate = new Replicate({
        auth: "ENTER_API_KEY_HERE",
    });

    const model = "meta/llama-2-70b-chat:02e509c789964a7ea8736978a43525956ef40397be9033abf9fd2badfe68c9e3";
    const input = { 
        debug: false,
        top_k: 50,
        top_p: 1,
        prompt: promptInput,
        temperature: 0.5,
        system_prompt: "You are a helpful, respectful and kind assistant. Please assist the user in true and factual information. If you do not know something, do not spread false information!",
        max_new_tokens: 500,
        min_new_tokens: -1
    };
    console.log("Running API")
    const output = await replicate.run(model, { input });
    console.log("got output")
    const stringOutput = output.join("")
    return stringOutput
}

export default getResponse;