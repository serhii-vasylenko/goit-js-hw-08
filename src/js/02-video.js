import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const playerFrame = document.querySelector('#vimeo-player');
const player = new Player(playerFrame);
const PLAYER_CURRENT_TIME_STORAGE_KEY = 'videoplayer-current-time';

player
  .setCurrentTime(localStorage.getItem(PLAYER_CURRENT_TIME_STORAGE_KEY))
  .then(() => {})
  .catch(() => {
    player.setCurrentTime(0);
  });

player.on(
  'timeupdate',
  throttle(({ seconds }) => {
    localStorage.setItem(PLAYER_CURRENT_TIME_STORAGE_KEY, seconds);
  }, 1000)
);

// -------------------------
// Settings object version
// -------------------------
// const dafaultSettings = {
//   videoplayerCurrentTime: 0,
//   videoplayerCurrentVolume: 0.5,
// };

// const savedSettings = {
//   ...dafaultSettings,
//   ...JSON.parse(localStorage.getItem('playerSettings')),
// };
// console.log(savedSettings);

// player
//   .setCurrentTime(savedSettings.videoplayerCurrentTime)
//   .then(() => {
//     // seconds = the actual time that the player seeked to
//   })
//   .catch(() => {
//     player.setCurrentTime(dafaultSettings.videoplayerCurrentTime);
//   });

// player
//   .setVolume(savedSettings.videoplayerCurrentVolume)
//   .then(() => {
//     // seconds = the actual time that the player seeked to
//   })
//   .catch(error => {
//     console.log(error);
//     player.setVolume(dafaultSettings.videoplayerCurrentVolume);
//   });

// player.on(
//   'timeupdate',
//   throttle(({ seconds }) => {
//     localStorage.setItem(
//       'playerSettings',
//       JSON.stringify({
//         ...savedSettings,
//         videoplayerCurrentTime: seconds,
//       })
//     );
//   }, 1000)
// );

// player.on('volumechange', ({ volume }) => {
//   console.log(volume);
//   localStorage.setItem(
//     'playerSettings',
//     JSON.stringify({
//       ...savedSettings,
//       videoplayerCurrentVolume: volume,
//     })
//   );
// });
