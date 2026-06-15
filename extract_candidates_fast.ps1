# Optimized candidate extraction script using simpler regex parsing
param(
    [string]$CandidatePath = "c:\My Web Sites\electionupdate\election.ratopati.com\candidate",
    [string]$OutputPath = "c:\My Web Sites\electionupdate\app\public\data\candidates.json",
    [int]$Limit = 0  # 0 = all files
)

# Ensure output directory exists
$outputDir = Split-Path -Parent $OutputPath
if (!(Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
}

$candidates = @()
$count = 0

# Function to extract JSON-LD data efficiently
function Get-LDJsonQuick {
    param($content)
    $start = $content.IndexOf('<script type="application/ld+json">')
    if ($start -eq -1) { return $null }
    
    $start += 35  # length of '<script type="application/ld+json">'
    $end = $content.IndexOf('</script>', $start)
    if ($end -eq -1) { return $null }
    
    $jsonStr = $content.Substring($start, $end - $start).Trim()
    try {
        return $jsonStr | ConvertFrom-Json
    }
    catch {
        return $null
    }
}

Write-Host "Starting optimized candidate extraction..." -ForegroundColor Green

$htmlFiles = Get-ChildItem -Path $CandidatePath -Filter "*.html" -File
$totalFiles = $htmlFiles.Count

if ($Limit -gt 0) {
    $htmlFiles = $htmlFiles | Select-Object -First $Limit
}

foreach ($file in $htmlFiles) {
    $count++
    $percent = [math]::Round(($count / $totalFiles) * 100)
    Write-Progress -Activity "Extracting candidates" -Status "$percent% complete" -PercentComplete $percent -CurrentOperation $file.Name
    
    try {
        $content = Get-Content -Path $file.FullName -Encoding UTF8 -Raw
        $ldJson = Get-LDJsonQuick -content $content
        
        if ($ldJson -and $ldJson.name) {
            $candidate = @{
                name = $ldJson.name
                slug = $file.BaseName
                party = if ($ldJson.affiliation) { $ldJson.affiliation.name } else { "स्वतन्त्र" }
                partyLogo = if ($ldJson.affiliation) { $ldJson.affiliation.logo } else { "" }
                image = if ($ldJson.image) { $ldJson.image } else { "/assets/images/default.png" }
                jobTitle = if ($ldJson.jobTitle) { $ldJson.jobTitle } else { "" }
                votes = 0
            }
            
            $candidates += $candidate
        }
    }
    catch {
        # Silent skip on errors
    }
}

Write-Progress -Activity "Extracting candidates" -Completed

# Convert to JSON and save
$json = $candidates | ConvertTo-Json -Depth 10
$json | Out-File -FilePath $OutputPath -Encoding UTF8

Write-Host "`nExtraction complete!" -ForegroundColor Green
Write-Host "Total candidates extracted: $($candidates.Count) out of $totalFiles files" -ForegroundColor Yellow
Write-Host "Output saved to: $OutputPath" -ForegroundColor Green
