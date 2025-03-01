import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useToast } from '@/hooks/use-toast';

type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

export const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    return savedMessages ? JSON.parse(savedMessages) : [{
      id: '1',
      text: '¡Hola! ¿En qué podemos ayudarte?',
      isUser: false,
      timestamp: new Date(),
    }];
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Persistir mensajes en localStorage
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  // Auto-scroll al último mensaje
  useEffect(() => {
    if (messagesEndRef.current && isOpen) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      // Agregar mensaje del usuario
      const userMessage: Message = {
        id: crypto.randomUUID(),
        text: message.trim(),
        isUser: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, userMessage]);
      setMessage('');

      // Simular respuesta del agente
      setTimeout(() => {
        const agentMessage: Message = {
          id: crypto.randomUUID(),
          text: "Gracias por tu mensaje. Un agente se pondrá en contacto contigo pronto.",
          isUser: false,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, agentMessage]);
      }, 1000);

      toast({
        title: "Mensaje enviado",
        description: "Un agente responderá pronto.",
      });
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      toast({
        title: "Error",
        description: "No se pudo enviar el mensaje. Por favor, intenta de nuevo.",
        variant: "destructive",
      });
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    // No limpiamos los mensajes al cerrar para mantener el historial
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-16 h-16 shadow-lg bg-primary hover:bg-primary/90"
        >
          <MessageSquare className="h-6 w-6 text-primary-foreground" />
        </Button>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-80 h-[32rem] flex flex-col">
          <div className="bg-primary p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="text-white font-semibold">Chat 24/7</h3>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-white/80"
              onClick={handleClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`${
                    msg.isUser
                      ? 'ml-auto bg-primary text-primary-foreground'
                      : 'mr-auto bg-muted'
                  } p-3 rounded-lg max-w-[80%]`}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-700">
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="flex-1"
              />
              <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};