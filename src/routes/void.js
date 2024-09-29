/*
 * send information about next void
 */

import rpgEvent from '../core/RpgEvent';

export default (req, res) => {
  res.set({
    'Cache-Control': `public, max-age=${5 * 60}`,
  });
  if (rpgEvent.eventTimestamp) {
    const currentTime = new Date();
    const eventTime = new Date(rpgEvent.eventTimestamp);
    const timeDifference = Math.max(0, eventTime - currentTime);
    const STEP = rpgEvent.STEP;

    if (rpgEvent.success == 1) {  // si le void a été gagné

      var temps_buff = (STEP[5] - STEP[8]) * 1000 * 60
      var temps_restant = temps_buff - (currentTime - eventTime)

      res.send(`Event got won! time left : ${ms_to_time(temps_restant)}`);
    } else if (rpgEvent.success == 2) { // si le void a été perdu

      var temps_nerf = (STEP[5] - STEP[7]) * 1000 * 60
      var temps_restant = temps_nerf - (currentTime - eventTime)

      res.send(`Event got lost, time left : ${ms_to_time(temps_restant)}`);
    } else if (rpgEvent.eventState == 11) {

      var temps_void = (STEP[5] - STEP[6]) * 1000 * 60
      var temps_restant = temps_void - (currentTime - eventTime)

      const coord = [rpgEvent.eventArea[0] + rpgEvent.eventArea[2]/2, rpgEvent.eventArea[1] + rpgEvent.eventArea[3]/2];

      res.send(`Event ongoing, time left : ${ms_to_time(temps_restant)} <br> at <a href="/#d,${coord[0]},${coord[1]},15"> ${coord[0]},${coord[1]} </a>`);
    } else if (timeDifference === 0) {
      res.send(`Void has either won or hasn\'t been announced yet`);
    } else {
      res.send(`Time until next void: ` + ms_to_time(timeDifference));
    }
  } else {
    res.send('No void');
  }

}

function ms_to_time(ms){
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);

  return (`Time until next void: ${hours} hours, ${minutes} minutes, ${seconds} seconds`);
}