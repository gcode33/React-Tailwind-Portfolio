import { ArrowUpRight, Play, X } from "lucide-react";
import { embedUrl } from "@/lib/appleMusic";
import { sound, useSound } from "@/lib/sound";

// George's songs are commercial recordings, so they only ever play through Apple's own
// player. Nothing is requested from Apple until a visitor asks for a song, which keeps the
// first view fast and third parties out of it. One player at a time, and opening one
// pauses the dock's track (the engine keeps those two from overlapping).
export const SongList = ({ songs }) => {
  const { externalPlayer } = useSound();

  return (
    <ul className="mt-1 flex flex-col text-[15px]">
      {songs.map((song) => {
        const open = externalPlayer === song.href;
        const label = `${song.title}, ${song.artist}`;
        return (
          <li key={song.href}>
            <div className="flex items-stretch gap-1">
              <button
                type="button"
                aria-expanded={open}
                aria-label={open ? `Close player, ${label}` : `Play ${label}`}
                onClick={() => (open ? sound.closeExternalPlayer() : sound.openExternalPlayer(song.href))}
                className="flex min-h-11 min-w-0 flex-1 cursor-pointer items-center gap-2 py-1 text-left text-accent underline-offset-4 hover:underline"
              >
                {open ? (
                  <X aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
                ) : (
                  <Play aria-hidden="true" className="h-3.5 w-3.5 shrink-0 fill-current" />
                )}
                <span>{label}</span>
              </button>
              <a
                href={song.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${label} in Apple Music`}
                className="flex min-h-11 min-w-11 shrink-0 items-center justify-center text-muted transition-colors hover:text-foreground"
              >
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
            {open && (
              <iframe
                title={`Apple Music player: ${label}`}
                src={embedUrl(song.href)}
                height="175"
                allow="autoplay *; encrypted-media *; clipboard-write"
                sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                className="mt-1 mb-3 block w-full overflow-hidden rounded-[10px] border-0 bg-subtle"
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};
