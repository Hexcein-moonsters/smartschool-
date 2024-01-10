<?php

// Warning: the following script is made completly by AI



// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Check if request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['method']) && $_GET['method'] === 'POST') {
    // Handle POST request data
    $postData = json_decode(urldecode(substr($_SERVER['REQUEST_URI'], strpos($_SERVER['REQUEST_URI'], '#') + 1)), true);

    if ($postData === null && json_last_error() !== JSON_ERROR_NONE) {
        // Error parsing POST data
        echo '{"error":"Invalid POST data"}';
        exit;
    }

    // Check extension details
    $extensionDetails = "jpjkkimkbifallgiknjfieafmfndlkng";
    if ($postData['extensionDetailsPOST'] !== $extensionDetails) {
        // If the extension details are invalid, throw an error
        echo '{"error":"Invalid extension details"}';
        exit;
    }

    // Use the received data for the logic
    $fileContent = $postData['content'];
    $method = $postData['method'];

    // Execute your logic for POST requests
    $secretData = [
        "apiUrl" => "https://api.github.com/repos/Hexcein-moonsters/smartschool-/contents/databases/",
        "authKey" => "Z2l0aHViX3BhdF8xMUE1UUdXR0kwQ29uOEhMaXdLYVREX2dXWmZwUWtKanFNcVZ3dzRna3R6QlJaR1JJdEgzMzNjMVpVSU5BOHVzTXE2WUZVVEYyTDZORGRQVHB5"
    ];

    $encodedContent = base64_encode($fileContent); // Encode the content to base64
    $apiUrl = $secretData['apiUrl'] . $method . ".json"; // Use the method received in the POST data

    echo '{"authKey":"' . $secretData['authKey'] . '","apiUrl":"' . $secretData['apiUrl'] . '"}';
} else {
    // If the request method is not POST, throw an error
    echo '{"error":"Invalid request method"}';
}

exit;
?>
