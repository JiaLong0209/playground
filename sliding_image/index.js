const track = document.querySelector("#image-track");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
    if(track.dataset.mouseDownAt === "0") return;
    let mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
    let maxDelta = window.innerWidth / 1.3;

    let percentage = (mouseDelta / maxDelta) * -100;
    let nextPercentageUnconstraied = parseFloat(track.dataset.prevPercentage) + percentage;
    let nextPercentage = nextPercentageUnconstraied > 0 ? 0 : nextPercentageUnconstraied < -90 ? -90 : nextPercentageUnconstraied;
    // Math.max(Math.min(nextPercentageUnconstraied, 0 ) -100);
    track.dataset.percentage = nextPercentage;

    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
      },
       { duration: 700, fill: "forwards" });
      
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 800, fill: "forwards" });
  }
}


window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);