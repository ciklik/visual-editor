<?php
function renderBlock($data) {
    if (file_exists('components/' . $data['_name'] . '.php')) {
        include 'components/' . $data['_name'] . '.php';
    } else {
        echo "<div style='padding: 2rem 0;'>Bloc manquant : {$data['_name']}</div>";
    }
}

/**
 * Convert data into a style attribute
 */
function dataToStyle(array $params)
{
    $styles = '';
    if (!empty($params['background'] ?? null)) {
        $styles .= "--background: url({$params['background']});";
    }
    if (!empty($params['backgroundMobile'] ?? null)) {
        $styles .= "--backgroundMobile: url({$params['backgroundMobile']});";
    }
    if (!empty($params['backgroundColor'] ?? null)) {
        $styles .= "--backgroundColor: var({$params['backgroundColor']});";
    }
    if (!empty($params['textColor'] ?? null)) {
        $styles .= "color: var({$params['textColor']});";
    }
    $additionalVariables = [
        'backgroundSize'      => 'cover',
        'backgroundRepeat'    => 'no-repeat',
        'backgroundYPosition' => 'center',
        'backgroundXPosition' => 'center'
    ];
    foreach ($additionalVariables as $variable => $default) {
        $value = $params[$variable] ?? $default;
        if ($value !== $default) {
            $styles .= "--{$variable}: {$params[$variable]};";
        }
    }
    return $styles;
}

function button (array $data) {
    $url = $data['url'] ?? '#';
    $type = $data['type'] ?? 'primary' ;
    $label = $data['label'] ?? 'Missing label' ;
    return <<<HTML
        <a href="{$url}" class="btn btn-{$type} my-2">{$label}</a>
    HTML;
}
