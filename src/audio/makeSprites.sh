#!/usr/bin/env bash
audiosprite -f "howler" -e "m4a,mp3,ogg", -o "ch0" ./ch0/*.wav;
audiosprite -f "howler" -e "m4a,mp3,ogg", -o "ch1" ./ch1/*.wav;
audiosprite -f "howler" -e "m4a,mp3,ogg", -o "ch2" ./ch2/*.wav;
audiosprite -f "howler" -e "m4a,mp3,ogg", -o "ch3" ./ch3/*.wav;
audiosprite -f "howler" -e "m4a,mp3,ogg", -o "ch4" ./ch4/*.wav;
audiosprite -f "howler" -e "m4a,mp3,ogg", -o "ch5" ./ch5/*.wav;
audiosprite -f "howler" -e "m4a,mp3,ogg", -o "ch6" ./ch6/*.wav;
audiosprite -f "howler" -e "m4a,mp3,ogg", -o "ch7" ./ch7/*.wav;
audiosprite -f "howler" -e "m4a,mp3,ogg", -o "ch8" ./ch8/*.wav;
audiosprite -f "howler" -e "m4a,mp3,ogg", -o "ch9" ./ch9/*.wav;
audiosprite -f "howler" -e "m4a,mp3,ogg", -o "ch10" ./ch10/*.wav;
audiosprite -f "howler" -e "m4a,mp3,ogg", -o "ch11" ./ch11/*.wav;
audiosprite -f "howler" -e "m4a,mp3,ogg", -o "ch12" ./ch12/*.wav;
audiosprite -f "howler" -e "m4a,mp3,ogg", -o "ch13" ./ch13/*.wav;
audiosprite -f "howler" -e "m4a,mp3,ogg", -o "ch14" ./ch14/*.wav;
audiosprite -f "howler" -e "m4a,mp3,ogg", -o "ch15" ./ch15/*.wav;
audiosprite -f "howler" -e "m4a,mp3,ogg", -o "ch16" ./ch16/*.wav;
audiosprite -f "howler" -e "m4a,mp3,ogg", -o "ch17" ./ch17/*.wav;
cp -f *.mp3 ../main/webApp/assetPacks/desktop/sounds
cp -f *.mp3 ../main/webApp/assetPacks/mobile/sounds
cp -f *.mp3 ../main/webApp/assetPacks/tablet/sounds

cp -f *.m4a ../main/webApp/assetPacks/desktop/sounds
cp -f *.m4a ../main/webApp/assetPacks/mobile/sounds
cp -f *.m4a ../main/webApp/assetPacks/tablet/sounds

cp -f *.ogg ../main/webApp/assetPacks/desktop/sounds
cp -f *.ogg ../main/webApp/assetPacks/mobile/sounds
cp -f *.ogg ../main/webApp/assetPacks/tablet/sounds

cp -f *.json ../main/webApp/assetPacks/desktop/sounds
cp -f *.json ../main/webApp/assetPacks/mobile/sounds
cp -f *.json ../main/webApp/assetPacks/tablet/sounds
