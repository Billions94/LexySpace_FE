import { useState, createRef } from "react";
import { Image } from "react-bootstrap";
import { playIcon, pauseIcon } from "../../assets/icons";

interface SingleSongProps {
  song: any;
  index: any;
}

export default function SingleSong({ song, index }: SingleSongProps) {
  const refs = createRef<HTMLAudioElement>();
  const [isPlaying, setIsPlaying] = useState<any>('');
  // const [selected, setSelected] = useState<any>("");

  function togglePlay(selectedIndex?: any) {
    // !isPlaying ? play(selectedIndex) : pause(selectedIndex);
    if (isPlaying === selectedIndex) {
      setIsPlaying("");
      return;
    }

    setIsPlaying(selectedIndex);
    return;
  }

  const play = (selectedIndex?: number) => {
    setIsPlaying(!isPlaying);

    refs.current!.play();
  };
  const pause = (selectedIndex?: number) => {
    setIsPlaying(!isPlaying);

    refs.current!.pause();
  };

  return (
    <>
      <div
        onClick={() => {
          togglePlay(index);
          // setSelected(index);
        }}
        className="musicInfo"
      >
        <div className="position-relative">
          <Image
            className="albumPicture"
            roundedCircle
            src={song?.album?.cover_medium}
            alt=""
            width="60px"
            height="60px"
          />
        </div>
        <div className="playStatus">
          {isPlaying !== index ? (
            <Image
              roundedCircle
              src={playIcon}
              alt=""
              width="30px"
              height="30px"
            />
          ) : (
            <Image
              roundedCircle
              src={pauseIcon}
              alt=""
              width="30px"
              height="30px"
            />
          )}
        </div>
        <p className="strong">{song?.title_short}</p>
      </div>
      <audio ref={refs} src={song?.preview} />
    </>
  );
}
