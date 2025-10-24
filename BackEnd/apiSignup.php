<?php
    include 'FetchData.php';

    header('Content-Type: application/json');

    $recaptchaResponse = $_POST['g-recaptcha-response'] ?? '';
    if (!verifyRecaptcha($recaptchaResponse)) {
        echo json_encode(['success' => false, 'message' => 'CAPTCHA verification failed. Please try again.']);
        exit;
    }

    // It's good practice to check if POST data is set
    if (!isset($_POST['firstName']) || !isset($_POST['lastName']) || !isset($_POST['email']) || !isset($_POST['password'])) {
        echo json_encode(['success' => false, 'message' => 'Missing required fields.']);
        exit;
    }


    $firstName = strtolower($_POST['firstName']);
    $lastName = strtolower($_POST['lastName']);
    $email = strtolower($_POST['email']);
    $password = $_POST['password'];

    try {
        if (userExists($email)) {
            echo json_encode(['success' => false, 'message' => 'An account with this email already exists.']);
        } else {
            addUser($lastName, $firstName, $email, $password);
                $_SESSION['emailU'] = $email;
            $_SESSION['nameU'] = $firstName . ' ' . $lastName;
            echo json_encode(['success' => true, 'message' => 'Account created successfully!']);
        }
    } catch (Exception $e) {
        // In production, you would log the error instead of echoing it.
        echo json_encode(['success' => false, 'message' => 'An error occurred during sign up. Please try again.']);
    }
?>