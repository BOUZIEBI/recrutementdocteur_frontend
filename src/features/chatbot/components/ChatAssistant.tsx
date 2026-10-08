import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { findBestAnswer, quickQuestions } from '../data/chatbotKnowledge';

type Message = {
  role: 'bot' | 'user';
  text: string;
};

const welcome: Message = {
  role: 'bot',
  text: "Bonjour ! Je suis l'assistant virtuel de la DRH-MESRS. Posez-moi une question sur nos services, le recrutement, le SYGRH ou les démarches administratives.",
};

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([welcome]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing, open]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: Message = { role: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    window.setTimeout(() => {
      const { answer } = findBestAnswer(trimmed);
      setTyping(false);
      setMessages((prev) => [...prev, { role: 'bot', text: answer }]);
    }, 650);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleQuick = (q: string) => sendMessage(q);

  const handleNavigate = () => {
    setOpen(false);
    navigate('/contacts');
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div className="relative max-w-8xl mx-auto w-full h-full">
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Fermer l assistant' : 'Ouvrir l assistant'}
          className={`pointer-events-auto absolute bottom-5 right-5 flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300 ${
            open
              ? 'bg-gray-800 rotate-90'
              : 'bg-orange-500 hover:bg-orange-600 hover:scale-110 animate-pulse'
          }`}
        >
          {open ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <MessageCircle className="w-7 h-7 text-white" />
          )}
          {!open && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
          )}
        </button>

        {open && (
          <div className="pointer-events-auto absolute bottom-24 right-5 w-[calc(100vw-2.5rem)] sm:w-96 max-h-[70vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-4 flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-sm flex items-center gap-1.5">
                Assistant DRH-MESRS
                <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
              </h3>
              <p className="text-white/80 text-xs">En ligne · Réponses automatiques</p>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'bot' && (
                  <div className="flex-shrink-0 bg-orange-500 p-1.5 rounded-lg self-end">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gray-800 text-white rounded-br-sm'
                      : 'bg-white text-gray-700 border border-gray-100 shadow-sm rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
                {msg.role === 'user' && (
                  <div className="flex-shrink-0 bg-gray-700 p-1.5 rounded-lg self-end">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}

            {typing && (
              <div className="flex gap-2 justify-start">
                <div className="flex-shrink-0 bg-orange-500 p-1.5 rounded-lg self-end">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm border border-gray-100 shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            {messages.length === 1 && !typing && (
              <div className="pt-2">
                <p className="text-xs text-gray-400 mb-2 px-1">Questions fréquentes :</p>
                <div className="flex flex-col gap-1.5">
                  {quickQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleQuick(q)}
                      className="text-left text-sm text-gray-700 bg-white hover:bg-orange-50 hover:text-orange-600 border border-gray-100 hover:border-orange-200 rounded-xl px-3 py-2 transition-colors duration-150"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-gray-100 bg-white">
            <button
              onClick={handleNavigate}
              className="w-full text-xs text-gray-500 hover:text-orange-600 py-2 transition-colors"
            >
              Besoin d'aide humaine ? Écrivez-nous via la page Contacts
            </button>
            <form onSubmit={handleSubmit} className="flex items-center gap-2 px-3 pb-3">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez votre question..."
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm text-gray-900 placeholder:text-gray-400 transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="flex-shrink-0 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed text-white p-2.5 rounded-xl transition-all duration-200"
                aria-label="Envoyer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
