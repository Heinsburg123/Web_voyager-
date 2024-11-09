"use client";

import { ArrowUpCircleIcon } from "@heroicons/react/24/solid"
import { useState } from "react";
import { handleSendMessage } from "../lib/actions";
import clsx from "clsx";

type Message = {
    sender: "user" | "bot";
    text: string;
};

export default function ChatBox() {
    const [messages, setMessages] = useState<Message[]>([]);

    async function onSubmit(formData: FormData) {
        const prompt = formData.get("prompt") as string;

        const response = await handleSendMessage(formData);

        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "user", text: prompt },
            { sender: "bot", text: response },
        ]);
    }

    return(
        <div className="basis-1/4 h-full bg-cyan-50 rounded-lg flex flex-col p-2" >
            <div className="h-full overflow-y-auto flex flex-col">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={clsx(
                            'bg-teal-100 my-4 rounded-lg p-4 text-sky-700',
                            {
                                'text-left bg-transparent p-0': message.sender === "bot",
                                'text-right w-auto self-end': message.sender === "user"
                            }
                        )}
                    >
                        {message.text}
                    </div>
                ))}
            </div>
            <form action={onSubmit} className="relative">
                <input 
                    name="prompt"
                    type="text"
                    className="block w-full rounded-full py-[9px] pl-3 pr-12 text-sm outline-2 placeholder:text-gray-500 focus:outline-none text-black"
                    placeholder="Message ChatBot"
                    required
                    autoComplete="off"
                />
                <button type="submit" className="absolute right-2 top-1/2 h-[30px] w-[30px] -translate-y-1/2">
                    <ArrowUpCircleIcon className="text-gray-500 hover:text-gray-400 cursor-pointer"/>
                </button>
            </form>
      </div>
    )
}