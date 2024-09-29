$path = "dist\ecosystem.yml"
(Get-Content $path) -replace 'HOST: "109.176.197.15"', '#HOST: "109.176.197.15"' -replace '#HOST: "localhost"', 'HOST: "localhost"' | Set-Content $path