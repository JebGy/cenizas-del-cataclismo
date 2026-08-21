# Script de Descarga Automatica de Mods - Minecraft Forge 1.20.1
$ErrorActionPreference = 'Continue'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12 -bor [Net.SecurityProtocolType]::Tls13

$ModsDir = "$env:APPDATA\.minecraft\mods"
if (-not (Test-Path -Path $ModsDir)) {
    New-Item -ItemType Directory -Path $ModsDir -Force | Out-Null
}

Write-Host '============================================================' -ForegroundColor Cyan
Write-Host '   INSTALADOR AUTOMATICO DE MODS - FORGE 1.20.1' -ForegroundColor Yellow
Write-Host "   Destino: $ModsDir" -ForegroundColor Cyan
Write-Host '============================================================`n' -ForegroundColor Cyan

$Mods = @(
    @{ Name = 'Lootr'; File = 'lootr-forge-1.20-0.7.35.94.jar'; Url = 'https://edge.forgecdn.net/files/7263/76/lootr-forge-1.20-0.7.35.94.jar' },
    @{ Name = 'Much More Dungeons'; File = 'muchmoredungeons-forge-1.20.1-1.1.3.jar'; Url = 'https://edge.forgecdn.net/files/8554/344/muchmoredungeons-forge-1.20.1-1.1.3.jar' },
    @{ Name = 'When Dungeons Arise'; File = 'DungeonsArise-1.20.x-2.1.58-release.jar'; Url = 'https://edge.forgecdn.net/files/4983/862/DungeonsArise-1.20.x-2.1.58-release.jar' },
    @{ Name = 'Incendium'; File = 'Incendium_1.20.x_v5.3.5.jar'; Url = 'https://edge.forgecdn.net/files/5351/562/Incendium_1.20.x_v5.3.5.jar' },
    @{ Name = 'Dungeon Now Loading'; File = 'Dungeon Now Loading-forge-1.20.1-2.2.jar'; Url = 'https://edge.forgecdn.net/files/8023/973/Dungeon%20Now%20Loading-forge-1.20.1-2.2.jar' },
    @{ Name = 'Dungeons and Taverns'; File = 'dungeons-and-taverns-3.0.3.f.jar'; Url = 'https://cdn.modrinth.com/data/tpehi7ww/versions/ojHpWOrz/dungeons-and-taverns-3.0.3.f.jar' },
    @{ Name = 'ATi Structures'; File = 'ATi Structures V1.4.6.jar'; Url = 'https://edge.forgecdn.net/files/8385/812/ATi%20Structures%20V1.4.6.jar' },
    @{ Name = 'It Takes a Pillage'; File = 'takesapillage-1.0.3-1.20.1.jar'; Url = 'https://edge.forgecdn.net/files/4981/343/takesapillage-1.0.3-1.20.1.jar' },
    @{ Name = 'Tax Castle Pillager'; File = 'TaxCastlePillager+M.1.20.1+ForM.1.0.1.jar'; Url = 'https://edge.forgecdn.net/files/5090/963/TaxCastlePillager%2bM.1.20.1%2bForM.1.0.1.jar' },
    @{ Name = 'Nordic Adventure'; File = 'nordic_structures-1.6.9-forge-1.20.1.jar'; Url = 'https://cdn.modrinth.com/data/IbXFBZcX/versions/cFt6AGK3/nordic_structures-1.6.9-forge-1.20.1.jar' },
    @{ Name = 'The Graveyard (Forge)'; File = 'The_Graveyard_3.1_(FORGE)_for_1.20.1.jar'; Url = 'https://cdn.modrinth.com/data/U1jdQuSf/versions/Q66WyQ3F/The_Graveyard_3.1_%28FORGE%29_for_1.20.1.jar' },
    @{ Name = 'Mofu''s Better End'; File = 'mofus_broken_constellation-0.9.0-forge-1.20.1.jar'; Url = 'https://edge.forgecdn.net/files/6377/645/mofus_broken_constellation-0.9.0-forge-1.20.1.jar' },
    @{ Name = 'Apocalyptic Bosses'; File = 'panascraftrpgmod-3.6-forge-1.20.1.jar'; Url = 'https://edge.forgecdn.net/files/8443/395/panascraftrpgmod-3.6-forge-1.20.1.jar' },
    @{ Name = 'Bosses of Mass Destruction'; File = 'BOMD-Forge-1.20.1-1.1.2.jar'; Url = 'https://edge.forgecdn.net/files/5067/728/BOMD-Forge-1.20.1-1.1.2.jar' },
    @{ Name = 'Bosses'' Rise'; File = 'block_factorys_bosses-2.1.2-forge-1.20.1.jar'; Url = 'https://edge.forgecdn.net/files/8123/166/block_factorys_bosses-2.1.2-forge-1.20.1.jar' },
    @{ Name = 'Legendary Monsters'; File = 'legendarymonsters-2.2.1 MC 1.20.1.jar'; Url = 'https://cdn.modrinth.com/data/9d9Bkqva/versions/8yZ3BOky/legendarymonsters-2.2.1%20MC%201.20.1.jar' },
    @{ Name = 'Aquamirae [Forge]'; File = 'aquamirae-forge-1.20.1-7.1.13.jar'; Url = 'https://edge.forgecdn.net/files/8678/729/aquamirae-forge-1.20.1-7.1.13.jar' },
    @{ Name = 'Marium''s Soulslike Weaponry'; File = 'soulslike-weaponry-1.4.8-1.20.1-forge.jar'; Url = 'https://edge.forgecdn.net/files/8302/956/soulslike-weaponry-1.4.8-1.20.1-forge.jar' },
    @{ Name = 'Boss Checklist'; File = 'boss_checklist-forge-5.2.0.jar'; Url = 'https://edge.forgecdn.net/files/8424/16/boss_checklist-forge-5.2.0.jar' },
    @{ Name = 'From The Shadows Reborn'; File = 'fromtheshadowsreborn-2.9.jar'; Url = 'https://edge.forgecdn.net/files/7217/618/fromtheshadowsreborn-2.9.jar' },
    @{ Name = 'Mutant Monsters'; File = 'MutantMonsters-v8.0.8-1.20.1-Forge.jar'; Url = 'https://edge.forgecdn.net/files/7232/503/MutantMonsters-v8.0.8-1.20.1-Forge.jar' },
    @{ Name = 'Monster Expansion'; File = 'monsterexpansion-1.20.1-v0.7.6.jar'; Url = 'https://edge.forgecdn.net/files/8594/666/monsterexpansion-1.20.1-v0.7.6.jar' },
    @{ Name = 'Knight Quest Reforged'; File = 'knightquest-forge-1.20.1-1.9.6.jar'; Url = 'https://edge.forgecdn.net/files/8253/271/knightquest-forge-1.20.1-1.9.6.jar' },
    @{ Name = 'Better Combat'; File = 'bettercombat-forge-1.9.0+1.20.1.jar'; Url = 'https://edge.forgecdn.net/files/7287/334/bettercombat-forge-1.9.0%2b1.20.1.jar' },
    @{ Name = 'Mowzie''s Mobs'; File = 'mowziesmobs-1.8.2.jar'; Url = 'https://edge.forgecdn.net/files/7815/705/mowziesmobs-1.8.2.jar' },
    @{ Name = 'EEEAB''s Mobs'; File = 'eeeabsmobs-1.20.1-0.98.1.jar'; Url = 'https://edge.forgecdn.net/files/8073/814/eeeabsmobs-1.20.1-0.98.1.jar' },
    @{ Name = 'GeckoLib 4.8.4'; File = 'geckolib-forge-1.20.1-4.8.4.jar'; Url = 'https://edge.forgecdn.net/files/8285/794/geckolib-forge-1.20.1-4.8.4.jar' },
    @{ Name = 'More Hitboxes'; File = 'morehitboxes-forge-1.20.1-1.9.2.jar'; Url = 'https://edge.forgecdn.net/files/6942/239/morehitboxes-forge-1.20.1-1.9.2.jar' },
    @{ Name = 'Knight Lib'; File = 'knightlib-forge-1.20.1-1.6.1.jar'; Url = 'https://edge.forgecdn.net/files/8400/697/knightlib-forge-1.20.1-1.6.1.jar' },
    @{ Name = 'Fragmentum'; File = 'fragmentum-forge-1.20.1-1.5.2.jar'; Url = 'https://edge.forgecdn.net/files/8506/891/fragmentum-forge-1.20.1-1.5.2.jar' },
    @{ Name = 'AttributeFix'; File = 'AttributeFix-Forge-1.20.1-21.0.5.jar'; Url = 'https://edge.forgecdn.net/files/7612/291/AttributeFix-Forge-1.20.1-21.0.5.jar' },
    @{ Name = 'Cloth Config API'; File = 'cloth-config-11.1.136-forge.jar'; Url = 'https://edge.forgecdn.net/files/5729/105/cloth-config-11.1.136-forge.jar' },
    @{ Name = 'playerAnimator'; File = 'player-animation-lib-forge-1.0.2-rc1+1.20.jar'; Url = 'https://edge.forgecdn.net/files/4587/214/player-animation-lib-forge-1.0.2-rc1%2b1.20.jar' },
    @{ Name = 'Cerbon''s API'; File = 'CerbonsAPI-Forge-1.20.1-1.1.0.jar'; Url = 'https://edge.forgecdn.net/files/5050/80/CerbonsAPI-Forge-1.20.1-1.1.0.jar' },
    @{ Name = 'Obscure API'; File = 'obscure_api-18.jar'; Url = 'https://edge.forgecdn.net/files/7171/906/obscure_api-18.jar' },
    @{ Name = 'Puzzles Lib'; File = 'PuzzlesLib-v8.1.33-1.20.1-Forge.jar'; Url = 'https://edge.forgecdn.net/files/6918/565/PuzzlesLib-v8.1.33-1.20.1-Forge.jar' }
)

$wc = New-Object System.Net.WebClient
$wc.Headers.Add('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)')
$Success = 0
$Total = $Mods.Count

for ($i = 0; $i -lt $Total; $i++) {
    $mod = $Mods[$i]
    $name = $mod.Name
    $file = $mod.File
    $url = $mod.Url
    $dest = Join-Path $ModsDir $file
    $num = $i + 1

    Write-Host "[$num/$Total] Descargando: $name ($file)... " -NoNewline
    try {
        $wc.DownloadFile($url, $dest)
        $sizeMB = [Math]::Round((Get-Item $dest).Length / 1MB, 2)
        Write-Host "[OK] ($sizeMB MB)" -ForegroundColor Green
        $Success++
    } catch {
        Write-Host "[ERROR: $_]" -ForegroundColor Red
    }
}
$wc.Dispose()

Write-Host "`n============================================================" -ForegroundColor Cyan
Write-Host "  Proceso finalizado: $Success de $Total mods instalados correctamente." -ForegroundColor Yellow
Write-Host '============================================================`n' -ForegroundColor Cyan