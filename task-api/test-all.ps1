$base = "http://localhost:3000/api/resources"
$results = @()

function Test-Endpoint {
    param($Number, $Name, $Method, $Url, $Body, $Expected)

    try {
        if ($Body) {
            $response = Invoke-WebRequest -Uri $Url -Method $Method -Body $Body -ContentType "application/json" -UseBasicParsing
        } else {
            $response = Invoke-WebRequest -Uri $Url -Method $Method -UseBasicParsing
        }
        $status = [int]$response.StatusCode
        $content = $response.Content
    } catch {
        # Invoke-WebRequest throws on 4xx/5xx, so read the status from the error
        $status = [int]$_.Exception.Response.StatusCode
        $content = $_.ErrorDetails.Message
    }

    if ($status -eq $Expected) { $pass = "PASS" } else { $pass = "FAIL" }

    Write-Host ""
    Write-Host "$Number. $Name"
    Write-Host "   $Method $Url"
    Write-Host "   Expected: $Expected   Actual: $status   -> $pass"
    Write-Host "   Body: $content"

    $script:results += [PSCustomObject]@{
        Test     = $Number
        Endpoint = $Name
        Expected = $Expected
        Actual   = $status
        Result   = $pass
    }
}

Test-Endpoint 1  "GET all"          "GET"    $base             $null                      200
Test-Endpoint 2  "GET one"          "GET"    "$base/1"         $null                      200
Test-Endpoint 3  "GET missing"      "GET"    "$base/99"        $null                      404
Test-Endpoint 4  "POST valid"       "POST"   $base             '{"title":"Write tests"}'  201
Test-Endpoint 5  "POST no title"    "POST"   $base             '{}'                       400
Test-Endpoint 6  "PUT valid"        "PUT"    "$base/1"         '{"completed":true}'       200
Test-Endpoint 7  "PUT missing"      "PUT"    "$base/99"        '{"completed":true}'       404
Test-Endpoint 8  "DELETE valid"     "DELETE" "$base/2"         $null                      200
Test-Endpoint 9  "DELETE repeat"    "DELETE" "$base/2"         $null                      404
Test-Endpoint 10 "GET after delete" "GET"    $base             $null                      200

Write-Host ""
Write-Host "===== SUMMARY ====="
$results | Format-Table -AutoSize