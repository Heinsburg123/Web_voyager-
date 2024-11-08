"use server";

export async function handleSendMessage(formData: FormData) {
    const prompt = formData.get("prompt");

    const responseMessage = `Your question is: ${prompt}`;

    return responseMessage;
}

export async function fetchGraphData() {
    let data = await fetch("https://aa29-128-119-202-179.ngrok-free.app/")
    let posts = await data.json()

    console.log(posts)

    return posts
}