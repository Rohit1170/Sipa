"use client";

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import confetti from "canvas-confetti";
import type {
  CreateTypes as ConfettiInstance,
  GlobalOptions as ConfettiGlobalOptions,
  Options as ConfettiOptions,
} from "canvas-confetti";

interface ConfettiApi {
  fire: (options?: ConfettiOptions) => Promise<void>;
}

export type ConfettiRef = ConfettiApi | null;

type ConfettiProps = React.ComponentPropsWithRef<"canvas"> & {
  options?: ConfettiOptions;
  globalOptions?: ConfettiGlobalOptions;
  /** When true, confetti never fires automatically on mount — only via ref.fire(). */
  manualstart?: boolean;
};

export const Confetti = forwardRef<ConfettiRef, ConfettiProps>((props, ref) => {
  const { options, globalOptions = { resize: true, useWorker: true }, manualstart = false, ...rest } = props;

  const instanceRef = useRef<ConfettiInstance | null>(null);

  const canvasRef = useCallback(
    (node: HTMLCanvasElement | null) => {
      if (node) {
        if (instanceRef.current) return;
        instanceRef.current = confetti.create(node, { ...globalOptions, resize: true });
      } else if (instanceRef.current) {
        instanceRef.current.reset();
        instanceRef.current = null;
      }
    },
    [globalOptions]
  );

  const fire = useCallback(
    async (fireOptions?: ConfettiOptions) => {
      try {
        await instanceRef.current?.({ ...options, ...fireOptions });
      } catch (err) {
        console.error("Confetti error:", err);
      }
    },
    [options]
  );

  const api = useMemo<ConfettiApi>(() => ({ fire }), [fire]);

  useImperativeHandle(ref, () => api, [api]);

  useEffect(() => {
    if (!manualstart) {
      fire();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manualstart]);

  return <canvas ref={canvasRef} {...rest} />;
});

Confetti.displayName = "Confetti";
