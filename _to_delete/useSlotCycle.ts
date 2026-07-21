import { useEffect, useState } from 'react';
import type { SlotPhase } from '../types/content';

export function useSlotCycle(results: string[], initialWord: string) {
  const [slotWords, setSlotWords] = useState([initialWord]);
  const [slotOffset, setSlotOffset] = useState(0);
  const [slotPhase, setSlotPhase] = useState<SlotPhase>('idle');

  useEffect(() => {
    let active = true;
    let outcomeIndex = 0;
    let currentWord = initialWord;
    const timeouts: number[] = [];

    const queue = (callback: () => void, delay: number) => {
      const timeoutId = window.setTimeout(callback, delay);
      timeouts.push(timeoutId);
    };

    const runSlotCycle = () => {
      if (!active) {
        return;
      }

      const targetWord = results[outcomeIndex];
      const reelWords = [
        currentWord,
        ...Array.from({ length: 24 }, (_, index) => results[index % results.length]),
        targetWord,
        targetWord,
      ];
      const targetIndex = reelWords.length - 2;

      setSlotWords(reelWords);
      setSlotOffset(0);
      setSlotPhase('idle');

      queue(() => {
        setSlotPhase('spinning');
        setSlotOffset(targetIndex + 0.22);
      }, 20);

      queue(() => {
        setSlotPhase('settling');
        setSlotOffset(targetIndex);
      }, 2180);

      queue(() => {
        setSlotPhase('idle');
        setSlotWords([targetWord]);
        setSlotOffset(0);
        currentWord = targetWord;
        outcomeIndex = (outcomeIndex + 1) % results.length;
        queue(runSlotCycle, 1800);
      }, 2400);
    };

    queue(runSlotCycle, 1200);

    return () => {
      active = false;
      timeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, [initialWord, results]);

  return { slotWords, slotOffset, slotPhase };
}
