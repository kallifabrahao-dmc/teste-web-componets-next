import type { AppProps } from "next/app";
import { useEffect, useRef, useState } from "react";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [addToast, setAddToast] = useState<
    | null
    | ((
        title: string,
        message: string,
        type: "success" | "error" | "warn" | "info",
        duration?: number,
        data?: any
      ) => void)
  >(null);

  const toastRef = useRef<any>(null);

  useEffect(() => {
    import("@comerc-teste/toast").then((module) => {
      if (module.addToast) {
        setAddToast(() => module.addToast);
      }
    });
  }, []);

  function showToast() {
    if (addToast) {
      addToast("Sucesso", "Clique no botão do Toast!", "success", 3000, {
        id: 1212,
        title: "Teste",
        array: [1, 2, 3],
      });
    }
  }

  function handleSendData(event: CustomEvent) {
    console.log("Evento `sendData` recebido:", event.detail);
  }

  useEffect(() => {
    const toastElement = toastRef.current;

    if (toastElement) {
      toastElement.addEventListener(
        "sendData",
        handleSendData as EventListener
      );
    }

    return () => {
      if (toastElement) {
        toastElement.removeEventListener(
          "sendData",
          handleSendData as EventListener
        );
      }
    };
  }, []);

  return (
    <>
      <button onClick={showToast}>Mostrar Toast</button>

      <ce-toast ref={toastRef} showActionButton position="left-bottom" />
    </>
  );
}
