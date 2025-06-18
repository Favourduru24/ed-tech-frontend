import qs from "query-string"
import { clsx,  } from "clsx";
import { twMerge } from "tailwind-merge";
import { voices } from "@/constants";
// import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";


export const configureQuizTutor = (voice, style) => { 
  
const voiceId = voices[voice?.toLowerCase()]?.[style?.toLowerCase()] || "sarah";

  const vapiAssistant = {
    name: "Companion",
    firstMessage:
        "Welcome to your ${subject} assessment. Topic: ${topic}. Answer clearly, and let’s begin.",
    transcriber: {
      provider: "deepgram",
      model: "nova-3",
      language: "en",
    },
    voice: {
      provider: "11labs",
      voiceId: voiceId,
      stability: 0.4,
      similarityBoost: 0.8,
      speed: 0.9,
      style: 0.5,
      useSpeakerBoost: true,
    },
    model: {
      provider: "openai",
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a friendly and engaging quiz tutor conducting a real-time quiz session with a student. Your goal is to test the student's knowledge on the given topic and subject while keeping the experience interactive and fun.

**Quiz Guidelines:**  
- **Stick to the topic:** {{ topic }} (Subject: {{ subject }})  
- **Follow the structured quiz flow:**  
  {{ questions }}  

**Engagement Rules:**  
✅ **Ask one question at a time** – Wait for the student’s response before moving to the next.  
✅ **Provide immediate feedback** –  
   - If correct: *"Great job! That’s correct. [Brief explanation if needed]."*  
   - If incorrect: *"Close! The correct answer is [X]. [Brief explanation]."*  
✅ **Encourage the student** –  
   - *"Take your time!"*  
   - *"You're doing great!"*  
✅ **Keep it natural** –  
   - Avoid robotic phrasing.  
   - Use a conversational but clear tone.  

**Wrap-Up:**  
- After the last question, summarize performance:  
  *"You got [X] out of [Y] correct! Well done!"*  
- End positively:  
  *"Great effort today! Feel free to retake the quiz anytime to improve. Goodbye!"*  

**Important Notes:**  
- **Keep responses short** (like a real conversation).  
- **Be encouraging** – even if answers are wrong.  
- **Avoid long explanations** unless necessary.  
- **Maintain a fun, quiz-show vibe!**
              `,
        },
      ],
    },
  };
  return vapiAssistant;
};

export const configureAssistant = (voice, style) => {
  // const voiceId = voices[voice][
  //         style()[keyof]
  //         ] || "sarah";
const voiceId = voices[voice?.toLowerCase()]?.[style?.toLowerCase()] || "sarah";

  const vapiAssistant = {
    name: "Companion",
    firstMessage:
        "Hello, let's start the session. Today we'll be talking about {{topic}}.",
    transcriber: {
      provider: "deepgram",
      model: "nova-3",
      language: "en",
    },
    voice: {
      provider: "11labs",
      voiceId: voiceId,
      stability: 0.4,
      similarityBoost: 0.8,
      speed: 0.9,
      style: 0.5,
      useSpeakerBoost: true,
    },
    model: {
      provider: "openai",
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a highly knowledgeable tutor teaching a real-time voice session with a student. Your goal is to teach the student about the topic and subject.

                    Tutor Guidelines:
                    Stick to the given topic - {{ topic }} and subject - {{ subject }} and teach the student about it.
                    Keep the conversation flowing smoothly while maintaining control.
                    From time to time make sure that the student is following you and understands you.
                    Break down the topic into smaller parts and teach the student one part at a time.
                    Keep your style of conversation {{ style }}.
                    Keep your responses short, like in a real voice conversation.
                    Do not include any special characters in your responses - this is a voice conversation.
              `,
        },
      ],
    },
    clientMessages: [],
    serverMessages: [],
  };
  return vapiAssistant;
};

export function formUrlQuery({ params, key, value }) {
    const currentUrl = qs.parse(params)
  
    currentUrl[key] = value
  
    return qs.stringifyUrl(
      {
        url: window.location.pathname,
        query: currentUrl,
      },
      { skipNull: true }
    )
  }

  export function removeKeysFromQuery({ params, keysToRemove }) {
    const currentUrl = qs.parse(params)
  
    keysToRemove.forEach(key => {
      delete currentUrl[key]
    })
  
    return qs.stringifyUrl(
      {
        url: window.location.pathname,
        query: currentUrl,
      },
      { skipNull: true }
    )
  }

  export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const calculateTrendPercentage = (countOfThisMonth, countOfLastMonth) => {
  
    if (countOfLastMonth === 0) {
        return countOfThisMonth === 0
            ? { trend: "no change", percentage: 0 }
            : { trend: "increment", percentage: 100 };
    }
      // 40 - 17 
    const change = countOfThisMonth - countOfLastMonth
    const percentage = Math.abs((change / countOfLastMonth) * 100);

    if (change > 0) {
        return { trend: "increment", percentage };
    } else if (change < 0) {
        return { trend: "decrement", percentage };
    } else {
        return { trend: "no change", percentage: 0 };
    }
};

export function formatDate(date) {
  const now = new Date();
  const inputDate = new Date(date);
  const seconds = Math.floor((now - inputDate) / 1000);
  
  // Time intervals in seconds
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  };
  
  // Calculate time difference for each interval
  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    
    if (interval >= 1) {
      return interval === 1 
        ? `${interval} ${unit} ago` 
        : `${interval} ${unit}s ago`;
    }
  }
  
  return "just now";
}

// /* eslint-disable prefer-const */
// /* eslint-disable no-prototype-builtins */
// import { type ClassValue, clsx } from "clsx";
// import qs from "qs";
// import { twMerge } from "tailwind-merge";

// import { aspectRatioOptions } from "@/constants";

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

// // ERROR HANDLER
// export const handleError = (error: unknown) => {
//   if (error instanceof Error) {
//     // This is a native JavaScript error (e.g., TypeError, RangeError)
//     console.error(error.message);
//     throw new Error(`Error: ${error.message}`);
//   } else if (typeof error === "string") {
//     // This is a string error message
//     console.error(error);
//     throw new Error(`Error: ${error}`);
//   } else {
//     // This is an unknown type of error
//     console.error(error);
//     throw new Error(`Unknown error: ${JSON.stringify(error)}`);
//   }
// };

// // PLACEHOLDER LOADER - while image is transforming
// const shimmer = (w: number, h: number) => `
// <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
//   <defs>
//     <linearGradient id="g">
//       <stop stop-color="#7986AC" offset="20%" />
//       <stop stop-color="#68769e" offset="50%" />
//       <stop stop-color="#7986AC" offset="70%" />
//     </linearGradient>
//   </defs>
//   <rect width="${w}" height="${h}" fill="#7986AC" />
//   <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
//   <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
// </svg>`;

// const toBase64 = (str: string) =>
//   typeof window === "undefined"
//     ? Buffer.from(str).toString("base64")
//     : window.btoa(str);

// export const dataUrl = `data:image/svg+xml;base64,${toBase64(
//   shimmer(1000, 1000)
// )}`;
// // ==== End

// // FORM URL QUERY
// export const formUrlQuery = ({
//   searchParams,
//   key,
//   value,
// }: FormUrlQueryParams) => {
//   const params = { ...qs.parse(searchParams.toString()), [key]: value };

//   return `${window.location.pathname}?${qs.stringify(params, {
//     skipNulls: true,
//   })}`;
// };

// // REMOVE KEY FROM QUERY
// export function removeKeysFromQuery({
//   searchParams,
//   keysToRemove,
// }: RemoveUrlQueryParams) {
//   const currentUrl = qs.parse(searchParams);

//   keysToRemove.forEach((key) => {
//     delete currentUrl[key];
//   });

//   // Remove null or undefined values
//   Object.keys(currentUrl).forEach(
//     (key) => currentUrl[key] == null && delete currentUrl[key]
//   );

//   return `${window.location.pathname}?${qs.stringify(currentUrl)}`;
// }

// // DEBOUNCE
// export const debounce = (func: (...args: any[]) => void, delay: number) => {
//   let timeoutId: NodeJS.Timeout | null;
//   return (...args: any[]) => {
//     if (timeoutId) clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => func.apply(null, args), delay);
//   };
// };

// // GE IMAGE SIZE
// export type AspectRatioKey = keyof typeof aspectRatioOptions;
// export const getImageSize = (
//   type: string,
//   image: any,
//   dimension: "width" | "height"
// ): number => {
//   if (type === "fill") {
//     return (
//       aspectRatioOptions[image.aspectRatio as AspectRatioKey]?.[dimension] ||
//       1000
//     );
//   }
//   return image?.[dimension] || 1000;
// };

// // DOWNLOAD IMAGE
// export const download = (url: string, filename: string) => {
//   if (!url) {
//     throw new Error("Resource URL not provided! You need to provide one");
//   }

//   fetch(url)
//     .then((response) => response.blob())
//     .then((blob) => {
//       const blobURL = URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = blobURL;

//       if (filename && filename.length)
//         a.download = `${filename.replace(" ", "_")}.png`;
//       document.body.appendChild(a);
//       a.click();
//     })
//     .catch((error) => console.log({ error }));
// };

// // DEEP MERGE OBJECTS
// export const deepMergeObjects = (obj1, obj2) => {
//   if(obj2 === null || obj2 === undefined) {
//     return obj1;
//   }

//   let output = { ...obj2 };

//   for (let key in obj1) {
//     if (obj1.hasOwnProperty(key)) {
//       if (
//         obj1[key] &&
//         typeof obj1[key] === "object" &&
//         obj2[key] &&
//         typeof obj2[key] === "object"
//       ) {
//         output[key] = deepMergeObjects(obj1[key], obj2[key]);
//       } else {
//         output[key] = obj1[key];
//       }
//     }
//   }

//   return output;
// };