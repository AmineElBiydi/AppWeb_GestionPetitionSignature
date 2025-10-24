<?php
function verifyRecaptcha($recaptchaResponse) {
    $secretKey = "6LdABvUrAAAAAOx7y8Ue1TQJsc-nP-gvhf3v4kNM"; // Your NEW secret key
    
    if (empty($recaptchaResponse)) {
        return false;
    }
    
    $url = 'https://www.google.com/recaptcha/api/siteverify';
    $data = [
        'secret' => $secretKey,
        'response' => $recaptchaResponse,
        'remoteip' => $_SERVER['REMOTE_ADDR']
    ];
    
    $options = [
        'http' => [
            'header' => "Content-type: application/x-www-form-urlencoded\r\n",
            'method' => 'POST',
            'content' => http_build_query($data)
        ]
    ];
    
    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    $resultJson = json_decode($result);
    
    return $resultJson->success;
}
?>