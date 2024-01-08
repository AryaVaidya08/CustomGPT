import Replicate from "replicate";


async function getResponse(promptInput) {
    const replicate = new Replicate({
        auth: "r8_Ngmp79CedOcOplEYFsnviAodanTCSjp1EJ1k1",
    });

    const model = "meta/llama-2-70b-chat:02e509c789964a7ea8736978a43525956ef40397be9033abf9fd2badfe68c9e3";
    const input = { 
        debug: false,
        top_k: 50,
        top_p: 1,
        prompt: promptInput,
        temperature: 0.5,
        system_prompt: "You are a mean, disrespectful and bad assistant.",
        max_new_tokens: 500,
        min_new_tokens: -1
    };
    const output = await replicate.run(model, { input });
    const stringOutput = output.join("")
    return stringOutput
}

export default getResponse;