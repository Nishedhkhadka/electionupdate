# PowerShell script to extract candidate data from HTML files
# This creates a JSON file with all candidate information

param(
    [string]$CandidatePath = "c:\My Web Sites\electionupdate\election.ratopati.com\candidate",
    [string]$OutputPath = "c:\My Web Sites\electionupdate\app\public\data\candidates.json"
)

# Ensure output directory exists
$outputDir = Split-Path -Parent $OutputPath
if (!(Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
}

$candidates = @()

# Function to extract text between tags
function Get-TextBetweenTags {
    param($content, $startTag, $endTag)
    $pattern = [regex]::Escape($startTag) + "(.*?)" + [regex]::Escape($endTag)
    $match = [regex]::Match($content, $pattern, [System.Text.RegularExpressions.RegexOptions]::Singleline)
    if ($match.Success) {
        return $match.Groups[1].Value.Trim()
    }
    return ""
}

# Function to extract JSON from LD+JSON structured data
function Get-LDJsonData {
    param($content)
    $pattern = '<script type="application/ld\+json">(.*?)</script>'
    $match = [regex]::Match($content, $pattern, [System.Text.RegularExpressions.RegexOptions]::Singleline)
    if ($match.Success) {
        try {
            $jsonString = $match.Groups[1].Value.Trim()
            return $jsonString | ConvertFrom-Json
        }
        catch {
            return $null
        }
    }
    return $null
}

Write-Host "Starting candidate data extraction from: $CandidatePath" -ForegroundColor Green

$count = 0
$htmlFiles = Get-ChildItem -Path $CandidatePath -Filter "*.html"

foreach ($file in $htmlFiles) {
    try {
        $content = Get-Content -Path $file.FullName -Encoding UTF8 -Raw
        
        # Extract structured data from JSON-LD
        $ldJson = Get-LDJsonData -content $content
        
        if ($ldJson) {
            $candidate = @{
                name = $ldJson.name
                slug = $file.BaseName
                party = $ldJson.affiliation.name
                partyLogo = $ldJson.affiliation.logo
                image = $ldJson.image
                jobTitle = $ldJson.jobTitle
                votes = 0
            }
            
            # Try to extract vote count from the page
            if ($ldJson.subjectOf.variableMeasured) {
                $votes = $ldJson.subjectOf.variableMeasured | Where-Object { $_.name -eq "जम्मा मत" }
                if ($votes) {
                    $candidate.votes = [int]$votes.value
                }
            }
            
            $candidates += $candidate
            $count++
            Write-Host "[$count] Extracted: $($candidate.name)" -ForegroundColor Cyan
        }
    }
    catch {
        Write-Host "Error processing $($file.Name): $_" -ForegroundColor Red
    }
}

# Convert to JSON and save
$json = $candidates | ConvertTo-Json -Depth 10
$json | Out-File -FilePath $OutputPath -Encoding UTF8

Write-Host "Successfully extracted $count candidates" -ForegroundColor Green
Write-Host "Output saved to: $OutputPath" -ForegroundColor Green
Write-Host "Sample data:" -ForegroundColor Yellow
$candidates | Select-Object -First 1 | ConvertTo-Json
