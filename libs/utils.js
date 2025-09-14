import qs from "query-string"
import { clsx,  } from "clsx";
import { twMerge } from "tailwind-merge";
import { voices } from "@/constants";


export const configureQuizTutor = (voice, style) => { 
  
const voiceId = voices[voice?.toLowerCase()]?.[style?.toLowerCase()] || "sarah";

  const vapiAssistant = {
    name: "Companion",
    firstMessage:
        `Welcome to your ${subject} assessment. Topic: ${topic}. Answer clearly, and let’s begin.`,
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
  
const voiceId = voices[voice?.toLowerCase()]?.[style?.toLowerCase()] || "sarah";

  const vapiAssistant = {
    name: "Companion",
    firstMessage:
        `Hello, let's start the session. Today we'll be talking about ${topic}.`,
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