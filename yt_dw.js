const { exec } = require('child_process');

const links = [
   '',
  //  ...
  // Dodaj inne linki do tablicy
];

const outputPath = '/music';

const downloadSongs = async (links, outputPath) => {
  for (const link of links) {
    const command = `python youtube-dl-master/youtube_dl/__main__.py --extract-audio --audio-format mp3 -o ${outputPath}/%(title)s.%(ext)s ${link}`;

    try {
      await runCommand(command);
      console.log(`Piosenka została pobrana: ${link}`);
    } catch (error) {
      console.error(`Błąd podczas pobierania piosenki (${link}): ${error.message}`);
    }
  }
};

const runCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      if (stderr) {
        reject(new Error(stderr));
        return;
      }
      resolve();
    });
  });
};

downloadSongs(links, outputPath);