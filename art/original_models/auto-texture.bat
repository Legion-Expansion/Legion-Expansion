cd C:\Program Files (x86)\Steam\SteamApps\common\Planetary Annihilation Titans\bin_x64\tools\

set unit=L_fighter_
set diffuse=%unit%diffuse
set material=%unit%material
set mask=%unit%mask

papatran --texture-mode include -o "C:\Users\Eoin\AppData\Local\Uber Entertainment\Planetary Annihilation\server_mods\com.pa.legion-expansion.server\art\original_models\%diffuse%.papa" "C:\Program Files (x86)\Steam\SteamApps\common\Planetary Annihilation Titans\media\pa\effects\textures\particles\uncompressed\%diffuse%.png"
papatran --texture-mode include -o "C:\Users\Eoin\AppData\Local\Uber Entertainment\Planetary Annihilation\server_mods\com.pa.legion-expansion.server\art\original_models\%material%.papa" "C:\Program Files (x86)\Steam\SteamApps\common\Planetary Annihilation Titans\media\pa\effects\textures\particles\uncompressed\%material%.png"
papatran --texture-mode include -o "C:\Users\Eoin\AppData\Local\Uber Entertainment\Planetary Annihilation\server_mods\com.pa.legion-expansion.server\art\original_models\%mask%.papa" "C:\Program Files (x86)\Steam\SteamApps\common\Planetary Annihilation Titans\media\pa\effects\textures\particles\uncompressed\%mask%.png"
pause
