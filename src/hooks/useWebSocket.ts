import { Token } from "@/types/token";
import { useEffect, useState } from "react";

export const useWebSocketMock = (tokens: Token[], enabled: boolean) => {
  const [liveTokens, setLiveTokens] = useState(tokens);

  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      setLiveTokens(prev => prev.map(token => ({
        ...token,
        price: token.price * (1 + (Math.random() - 0.5) * 0.02),
        priceChange24h: token.priceChange24h + (Math.random() - 0.5) * 2
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, [enabled]);

  return liveTokens;
};