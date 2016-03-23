<?php
    if (empty($_POST['mode'])) {
        http_response_code(403);
        exit();
    } else {
        switch ($_POST['mode']) {
            case 'add':
                $mode = 'add';
                break;
            case 'update':
                $mode = 'update';
                break;
            case 'delete':
                $mode = 'delete';
                break;
            default:
                http_response_code(403);
                exit();
        }
    }
    require('MySQL_connect.php');

    require('verify_user.php');
    //$userId = $_POST['user_id'];
    $output['userId'] = $userId;

    switch ($mode) {
        case 'add':
            if (empty($_POST['story_id']) || empty($_POST['prompt_id']) || empty($_POST['response'])) {
                http_response_code(403);
                exit();
            }
            $fields = "story_id, prompt_id, response, user_id";
            $fieldValues = "'{$_POST['story_id']}', '{$_POST['prompt_id']}', '{$_POST['response']}', '{$userId}'";

            $query = "INSERT INTO `story_prompts`($fields) VALUES ($fieldValues);";
            $output['query'] = $query;
        case 'update':
            break;
        case 'delete':
            break;
    }
    $result = mysqli_query($connect, $query);
    if ($result){
        $output['success'] = true;
    } else {
        $output['error_msg'] = 'empty data set';
        $output['success'] = false;
    }
    mysqli_close($connect);
    echo json_encode($output);
?>