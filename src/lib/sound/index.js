import { useSyncExternalStore } from "react";
import { soundtrack } from "@/data/profile";
import { createSoundEngine } from "./engine";

// One engine for the whole page. Components that only trigger effects call it directly, so
// a tick never causes a React render.
export const sound = createSoundEngine({ src: soundtrack.src });

export const useSound = () => useSyncExternalStore(sound.subscribe, sound.getSnapshot);
