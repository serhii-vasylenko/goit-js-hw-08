import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player
  .setCurrentTime(localStorage.getItem('videoplayer-current-time'))
  .then(() => {})
  .catch(() => {
    player.setCurrentTime(0);
  });

player.on(
  'timeupdate',
  throttle(({ seconds }) => {
    localStorage.setItem('videoplayer-current-time', seconds);
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
