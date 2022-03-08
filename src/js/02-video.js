import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

const timeUpdater = data => {
  localStorage.setItem('videoplayer-current-time', JSON.stringify(data.seconds));
};

const lastTime = localStorage.getItem('videoplayer-current-time');
const parsedLastTime = JSON.parse(lastTime);

player.on('timeupdate', throttle(timeUpdater, 1000));

player
  .setCurrentTime(parsedLastTime)
  .then(function (seconds) {
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;

      default:
        break;
    }
  });
