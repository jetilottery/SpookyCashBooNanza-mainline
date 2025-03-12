#!/usr/bin/env bash
rm -f ./src/main/webapp/assetPacks/desktop/sounds/*.*;
rm -f ./src/main/webapp/assetPacks/mobile/sounds/*.*;
rm -f ./src/main/webapp/assetPacks/tablet/sounds/*.*;

cp -f ./src/audio/*.json ./src/main/webapp/assetPacks/desktop/sounds;
cp -f ./src/audio/*.ogg ./src/main/webapp/assetPacks/desktop/sounds;
cp -f ./src/audio/*.m4a ./src/main/webapp/assetPacks/desktop/sounds;
cp -f ./src/audio/*.mp3 ./src/main/webapp/assetPacks/desktop/sounds;
cp -f ./src/audio/*.json ./src/main/webapp/assetPacks/mobile/sounds;
cp -f ./src/audio/*.ogg ./src/main/webapp/assetPacks/mobile/sounds;
cp -f ./src/audio/*.m4a ./src/main/webapp/assetPacks/mobile/sounds;
cp -f ./src/audio/*.mp3 ./src/main/webapp/assetPacks/mobile/sounds;
cp -f ./src/audio/*.json ./src/main/webapp/assetPacks/tablet/sounds;
cp -f ./src/audio/*.ogg ./src/main/webapp/assetPacks/tablet/sounds;
cp -f ./src/audio/*.m4a ./src/main/webapp/assetPacks/tablet/sounds;
cp -f ./src/audio/*.mp3 ./src/main/webapp/assetPacks/tablet/sounds;