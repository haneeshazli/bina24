# Local preview that mimics the vercel.json rewrites, so clean URLs like
# /packages resolve the way production does. Static hosting only.
#
#   powershell -NoProfile -ExecutionPolicy Bypass -File tools\serve.ps1
#
# Then browse http://localhost:8099/. Ctrl+C to stop.
# Two 404s are expected locally and are not faults:
#   /_vercel/insights/script.js  - only exists when served by Vercel
#   /favicon.ico                 - the site ships no favicon

$root = Split-Path -Parent $PSScriptRoot
$pages = @('about','contact','faq','how-it-works','packages','portfolio','terms')
$mime = @{ '.html'='text/html; charset=utf-8'; '.js'='application/javascript'; '.css'='text/css';
           '.png'='image/png'; '.jpg'='image/jpeg'; '.json'='application/json'; '.xml'='application/xml';
           '.txt'='text/plain'; '.svg'='image/svg+xml' }
$l = New-Object System.Net.HttpListener
$l.Prefixes.Add('http://localhost:8099/')
$l.Start()
Write-Output "serving $root on http://localhost:8099/"
while ($l.IsListening) {
  try {
    $ctx = $l.GetContext()
    $p = [System.Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath)
    if ($p -eq '/') { $rel = 'index.html' }
    elseif ($pages -contains $p.TrimStart('/')) { $rel = $p.TrimStart('/') + '.html' }
    else { $rel = $p.TrimStart('/') }
    $file = Join-Path $root ($rel -replace '/','\')
    if (Test-Path -LiteralPath $file -PathType Leaf) {
      $bytes = [System.IO.File]::ReadAllBytes($file)
      $ext = [System.IO.Path]::GetExtension($file).ToLower()
      $ctx.Response.ContentType = $(if ($mime.ContainsKey($ext)) { $mime[$ext] } else { 'application/octet-stream' })
      $ctx.Response.ContentLength64 = $bytes.Length
      $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
      Write-Output ("200 " + $p)
    } else {
      $ctx.Response.StatusCode = 404
      Write-Output ("404 " + $p)
    }
    $ctx.Response.Close()
  } catch { Write-Output ("ERR " + $_.Exception.Message) }
}
