import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Bot, Download, ExternalLink, Mail, MessageCircle, Send, Sparkles, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ChatLink, getPortfolioChatResponse, quickPrompts } from "@/data/portfolioKnowledge";

type Message = {
  id: number;
  role: "assistant" | "user";
  text: string;
  links?: ChatLink[];
};

const starterMessage: Message = {
  id: 1,
  role: "assistant",
  text:
    "Hi, I am Mandar's portfolio assistant. Ask me about his experience, projects, skills, resume, or contact details.",
};

const getLinkIcon = (href: string) => {
  if (href.startsWith("mailto:")) {
    return Mail;
  }

  if (href.endsWith(".pdf")) {
    return Download;
  }

  return ExternalLink;
};

const PortfolioChatbot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([starterMessage]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const showQuickPrompts = useMemo(() => messages.length <= 1, [messages.length]);

  useEffect(() => {
    if (!open) {
      return;
    }

    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    window.setTimeout(() => inputRef.current?.focus(), 80);
  }, [messages, open]);

  const askQuestion = (question: string) => {
    const cleanQuestion = question.trim();

    if (!cleanQuestion) {
      return;
    }

    const response = getPortfolioChatResponse(cleanQuestion);
    const createdAt = Date.now();

    setMessages((current) => [
      ...current,
      { id: createdAt, role: "user", text: cleanQuestion },
      { id: createdAt + 1, role: "assistant", text: response.text, links: response.links },
    ]);
    setInput("");
    setOpen(true);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    askQuestion(input);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[70] md:bottom-6 md:right-6">
      {open && (
        <section
          aria-label="Mandar portfolio chatbot"
          className="mb-4 flex h-[min(620px,calc(100vh-7rem))] w-[min(420px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-white/[0.12] bg-black/85 shadow-[0_24px_90px_hsl(var(--primary)/0.35)] backdrop-blur-2xl animate-scale-in"
        >
          <header className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/35 bg-primary/15 text-primary-glow">
                <Bot className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 font-display font-bold leading-tight">
                  Mandar AI
                  <span className="h-1.5 w-1.5 rounded-full bg-primary-glow shadow-[0_0_12px_hsl(var(--primary))]" />
                </div>
                <p className="truncate text-xs text-foreground/55">Portfolio, resume, projects, contact</p>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              aria-label="Close chatbot"
              data-cursor="hover"
              className="h-9 w-9 rounded-full text-foreground/70 hover:bg-white/10 hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          </header>

          <ScrollArea className="min-h-0 flex-1 px-4 py-4">
            <div className="space-y-4">
              {messages.map((message) => {
                const assistant = message.role === "assistant";

                return (
                  <div
                    key={message.id}
                    className={cn("flex gap-3", assistant ? "justify-start" : "justify-end")}
                  >
                    {assistant && (
                      <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary-glow">
                        <Bot className="h-3.5 w-3.5" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                        assistant
                          ? "border border-white/10 bg-white/[0.06] text-foreground/80"
                          : "bg-primary text-primary-foreground shadow-[0_0_28px_hsl(var(--primary)/0.3)]",
                      )}
                    >
                      <p className="whitespace-pre-line">{message.text}</p>
                      {message.links && message.links.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {message.links.map((link) => {
                            const Icon = getLinkIcon(link.href);

                            return (
                              <a
                                key={`${message.id}-${link.href}`}
                                href={link.href}
                                target={link.href.startsWith("http") ? "_blank" : undefined}
                                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                                data-cursor="hover"
                                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/35 px-3 py-1.5 text-xs font-semibold text-foreground/85 transition-colors hover:border-primary/50 hover:text-primary-glow"
                              >
                                <Icon className="h-3.5 w-3.5" />
                                {link.label}
                              </a>
                            );
                          })}
                        </div>
                      )}
                    </div>
                    {!assistant && (
                      <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-foreground/70">
                        <User className="h-3.5 w-3.5" />
                      </div>
                    )}
                  </div>
                );
              })}

              {showQuickPrompts && (
                <div className="ml-10 flex flex-wrap gap-2">
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => askQuestion(prompt)}
                      data-cursor="hover"
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-left text-xs text-foreground/70 transition-all hover:border-primary/45 hover:bg-primary/10 hover:text-foreground"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          </ScrollArea>

          <form onSubmit={handleSubmit} className="border-t border-white/10 p-3">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] p-1.5">
              <Sparkles className="ml-2 h-4 w-4 shrink-0 text-primary-glow" />
              <Input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about Mandar..."
                aria-label="Ask the portfolio assistant"
                className="h-10 border-0 bg-transparent px-1 text-sm text-foreground placeholder:text-foreground/35 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button
                type="submit"
                size="icon"
                aria-label="Send message"
                data-cursor="hover"
                className="h-10 w-10 shrink-0 rounded-full"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? "Close Mandar portfolio assistant" : "Open Mandar portfolio assistant"}
        data-cursor="hover"
        className="group relative ml-auto flex h-14 w-14 items-center justify-center rounded-full border border-primary/40 bg-primary text-primary-foreground shadow-[0_0_45px_hsl(var(--primary)/0.55)] transition-all hover:scale-105 hover:shadow-[0_0_65px_hsl(var(--primary)/0.75)]"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6 transition-transform group-hover:-rotate-6" />}
        <span className="absolute -right-0.5 -top-0.5 h-4 w-4 rounded-full border-2 border-black bg-primary-glow" />
      </button>
    </div>
  );
};

export default PortfolioChatbot;
