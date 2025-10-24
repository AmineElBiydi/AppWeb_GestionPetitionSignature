<?php
    include 'FetchData.php';
    include 'verifyRecaptcha.php';


    header('Content-Type: application/json');

    // VERIFY RECAPTCHA FIRST
    $recaptchaResponse = $_POST['g-recaptcha-response'] ?? '';
    if (!verifyRecaptcha($recaptchaResponse)) {
        echo json_encode(['success' => false, 'message' => 'CAPTCHA verification failed. Please try again.']);
        exit;
    }

    $email = strtolower($_POST['email']);
    $password = $_POST['password'];

    $user = verifyAuthentificationtUser($email, $password);
    if ($user) {
        $_SESSION['emailU'] = $user['email'];
        $_SESSION['nameU'] = $user['name'];
        echo json_encode(['success' => true, 'message' => 'User authenticated successfully!']);
    }else {
        echo json_encode(['success' => false, 'message' => 'Failed to authenticate user. Please try again.']);
    }

?>
