import { useState, useRef, useEffect } from "react";
import Message from "./Message";
import Thinking from "./Thinking";
import { MdSend, MdMic, MdMicOff } from "react-icons/md";
import { replaceProfanities } from "no-profanity";

const options=['gpt-4','gemini']
const gptModel = ["gpt-4", "gemini"];
const template = [
  {
    title: "برنامه‌ریزی سفر",
    prompt: "می‌خواهم سفری به نیویورک برنامه‌ریزی کنم.",
  },
  {
    title: "چگونه کیک درست کنیم",
    prompt: "چگونه کیکی با شکلات و توت‌فرنگی درست کنم؟",
  },
  {
    title: "ایده‌های کسب‌وکار",
    prompt: "۵ ایده کسب‌وکار جدید برای یک استارتاپ تولید کن.",
  },

];

const ChatView = ({ conversations, setConversations, currentConvId }) => {
  const messagesEndRef = useRef();
  const inputRef = useRef();
  const [formValue, setFormValue] = useState("");
  const [thinking, setThinking] = useState(false);
  const [selected, setSelected] = useState(options[0]);
  const [gpt, setGpt] = useState(gptModel[0]);
  const [isListening, setIsListening] = useState(false);
  const recognition = useRef(null);

  // Get the current conversation based on currentConvId
  const currentConversation = conversations.find(
    (conv) => conv.id === currentConvId
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const updateMessage = (newValue, ai = false, selected) => {
    const id = Date.now() + Math.floor(Math.random() * 1000000);
    const newMsg = {
      id: id,
      createdAt: Date.now(),
      text: newValue,
      ai: ai,
      selected: `${selected}`,
    };

    // Update the messages in the current conversation
    setConversations((prevConvs) =>
      prevConvs.map((conv) =>
        conv.id === currentConvId
          ? { ...conv, messages: [...conv.messages, newMsg] }
          : conv
      )
    );
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (formValue) {
      const cleanPrompt = replaceProfanities(formValue);
      const aiModel = selected;

      setThinking(true);
      setFormValue("");
      updateMessage(cleanPrompt, false, aiModel);

      try {
        const apiUrl =
          gpt === gptModel[0]
            ? `https://api4dev.ir/ai/?text=${encodeURIComponent(cleanPrompt)}`
            : `https://api.api4dev.ir/gemini_proxy?text=${encodeURIComponent(
                cleanPrompt
              )}`;
        const response = await fetch(apiUrl, { method: "GET" });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.text();

        if (data) {
          updateMessage(data, true, aiModel);
        } else {
          updateMessage("No response from AI.", true, aiModel);
        }
      } catch (error) {
        updateMessage("Error: Could not get response from API.", true, aiModel);
      }

      setThinking(false);
    } else {
      alert("لطفا اینپوت خالی نباشد");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage(e);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentConversation?.messages, thinking]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Initialize Speech Recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = "fa-IR";

      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setFormValue((prev) => `${prev} ${transcript}`.trim());
      };

      recognition.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const handleVoiceInput = () => {
    if (isListening) {
      recognition.current.stop();
      setIsListening(false);
    } else {
      recognition.current.start();
      setIsListening(true);
    }
  };

  return (
    <main className="relative flex flex-col h-screen p-1 overflow-hidden dark:bg-light-grey">
      <div className="mx-auto my-4 tabs tabs-boxed w-fit">
        <a
          onClick={() => setGpt(gptModel[0])}
          className={`${gpt == gptModel[0] && "tab-active"} tab`}
        >
            جی پی تی 4
        </a>
        <a
          onClick={() => setGpt(gptModel[1])}
          className={`${gpt == gptModel[1] && "tab-active"} tab`}
        >
          جمینای 1.5 فلش
        </a>
      </div>

      <section className="flex flex-col flex-grow w-full px-4 overflow-y-scroll sm:px-10 md:px-32">
        {currentConversation?.messages.length ? (
          currentConversation.messages.map((message, index) => (
            <Message key={index} message={{ ...message }} />
          ))
        ) : (
          <div className="flex my-2">
            <div className="w-screen overflow-hidden">
              <ul className="grid md:grid-cols-2 grid-cols-1 gap-2 mx-10">
                {template.map((item, index) => (
                  <li
                    onClick={() => setFormValue(item.prompt)}
                    key={index}
                    className="p-6 border rounded-lg border-slate-300 hover:border-slate-500"
                  >
                    <p className="text-base font-semibold">{item.title}</p>
                    <p className="text-sm">{item.prompt}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {thinking && <Thinking />}

        <span ref={messagesEndRef}></span>
      </section>
      <form
        className="flex flex-col mb-2 md:px-32 join sm:flex-row"
        onSubmit={sendMessage}
      >
        <div className="md:flex-row gap-1 flex flex-col items-stretch justify-between w-full">
          <textarea
            ref={inputRef}
            className="w-full grow px-1 border bg-gray-400 resize-none border-gray-500 rounded-lg outline-none join-item max-h-[20rem] min-h-[3rem]"
            style={{
              backgroundColor: `var(--textarea-bg)`,
              color: `var(--textarea-text)`,
            }}
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
          />
          <div className="flex items-center justify-end mr-4 gap-2">
            <button
              type="button"
              className={`px-2 h-full flex items-center justify-center `}
              onClick={handleVoiceInput}
              title={isListening ? "توقف گوش دادن" : "شروع گوش دادن"}
            >
              {isListening ? <MdMicOff size={24} /> : <MdMic size={24} />}
            </button>
            <button type="submit" className="join-item" disabled={!formValue}>
              <MdSend size={24} />
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default ChatView;
