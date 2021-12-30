<?php
require_once 'helpers.php';
$body = file_get_contents('php://input');
$data = json_decode($body, true);
if ($data['preview'] ?? null) {
  renderBlock($data);
  exit();
}
?><!DOCTYPE html>
<html lang="en">
<head>
  <script type="module" src="/@vite/client"></script>
  <script type="module">
    import RefreshRuntime from "/@react-refresh"
    RefreshRuntime.injectIntoGlobalHook(window)
    window.$RefreshReg$ = () => {}
    window.$RefreshSig$ = () => (type) => type
    window.__vite_plugin_react_preamble_installed__ = true
  </script>
  <meta charset="UTF-8"/>
  <link rel="icon" type="image/svg+xml" href="/src/favicon.svg"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
  <style>
    :root {
      --pink: #f50057;
      --purple: #651fff;
      --blue: #3d5afe;
      --green: #00e676;
      --lightblue: #00e5ff;
      --white: #FFF;
    }
    .text-right {
      text-align: right;
    }
    .bloc {
      background-image: var(--background);
      background-color: var(--backgroundColor);
      background-position:  var(--backgroundXPosition, center) var(--backgroundYPosition, center);
      background-repeat: var(--backgroundRepeat, no-repeat);
      background-size: var(--backgroundSize, cover);
      color: var(--textColor, currentColor);
    }

    @media only screen and (max-width: 760) {
      .bloc {
        background-image: var(--backgroundMobile);
      }
    }
  </style>
</head>
<body>

<header>
  <div class="collapse bg-dark" id="navbarHeader">
    <div class="container">
      <div class="row">
        <div class="col-sm-8 col-md-7 py-4">
          <h4 class="text-white">About</h4>
          <p class="text-muted">Add some information about the album below, the author, or any other background context. Make it a few sentences long so folks can pick up some informative tidbits. Then, link them off to some social networking sites or contact information.</p>
        </div>
        <div class="col-sm-4 offset-md-1 py-4">
          <h4 class="text-white">Contact</h4>
          <ul class="list-unstyled">
            <li><a href="#" class="text-white">Follow on Twitter</a></li>
            <li><a href="#" class="text-white">Like on Facebook</a></li>
            <li><a href="#" class="text-white">Email me</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="navbar navbar-dark bg-dark shadow-sm">
    <div class="container">
      <a href="#" class="navbar-brand d-flex align-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" aria-hidden="true" class="me-2" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
        <strong>Mon site</strong>
      </a>
    </div>
  </div>
</header>

<main role="main" id="ve-components">
<?php
array_map('renderBlock', $data)
?>
</main>
</body>
</html>
