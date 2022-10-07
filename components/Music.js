import { useState } from "react";

export default function Music() {
  const [togglestate, setTogglestate] = useState(false);
  const videoURL = "";
  function Startmusic() {
    if (typeof window != "undefined") {
      const videoFrame = window.document.getElementById("zen-music-bg-video");
      if (videoFrame.src.includes("&autoplay=0")) {
        // delete sutoplay=0 and replace with one
        // const autoplay = "&autoplay=1";
        videoFrame.src = videoFrame.src.replace("&autoplay=0", "&autoplay=1");
        console.log(videoFrame.src);
      } else {
        const autoplay = "&autoplay=1";
        videoFrame.src = videoFrame.src + autoplay;
        console.log(videoFrame.src);
      }
    }
  }

  function Stopmusic() {
    if (typeof window != "undefined") {
      const videoFrame = window.document.getElementById("zen-music-bg-video");
      // const autoplay = "&autoplay=0";
      videoFrame.src = videoFrame.src.replace("&autoplay=1", "&autoplay=0");
      console.log(videoFrame.src);
    }
  }
  function Toggler() {
    if (typeof window !== "undefined") {
      const musicBtn = window.document.getElementById("music-btn");
      if (musicBtn.value === "DISABLED") {
        console.log("It's disabled, going to enable it");
        musicBtn.value = "ENABLED";
        setTogglestate(true);
        Startmusic();
      } else {
        console.log("It's enabled now, click again to disable");
        musicBtn.value = "DISABLED";
        setTogglestate(false);
        Stopmusic();
      }
    }
  }

  return (
    <div>
      <iframe
        className=" invisible w-0 h-0"
        id="zen-music-bg-video"
        width="560"
        height="315"
        src="//www.youtube.com/embed/o8GrqUSdzi0?rel=0"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <button
        onClick={Toggler}
        id="music-btn"
        value="DISABLED"
        className=" text-white"
      >
        {togglestate ? "🙉 Disable Zen" : "🔉 Enable Zen"}
      </button>
    </div>
  );
}
