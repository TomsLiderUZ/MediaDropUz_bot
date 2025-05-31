const fs = require("fs");
const path = require("path");

const mediaJsonPath = path.join(__dirname, "media.json");
const mediaBasePath = path.join(__dirname, "..", "media-base");

function saveMedia(id, filePath, title) {
  let mediaList = [];
  if (fs.existsSync(mediaJsonPath)) {
    mediaList = JSON.parse(fs.readFileSync(mediaJsonPath));
  }

  mediaList.push({
    id,
    path: filePath,
    title,
  });

  fs.writeFileSync(mediaJsonPath, JSON.stringify(mediaList, null, 2));
}

module.exports = { saveMedia };
