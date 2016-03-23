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
            if (empty($_POST['title']) || empty($_POST['description'])) {
                http_response_code(403);
                exit();
            }
            $fields = "title, description, user_id";
            $fieldValues = "'{$_POST['title']}', '{$_POST['description']}', '{$userId}'";
            if (!empty($_POST['category'])) {
                $fields .= ", category";
                $fieldValues .= ", '{$_POST['category']}'";
            }
            if (!empty($_POST['genre'])) {
                $fields .= ", genre";
                $fieldValues .= ", '{$_POST['genre']}'";
            }
            if (!empty($_POST['setting'])) {
                $fields .= ", setting";
                $fieldValues .= ", '{$_POST['setting']}'";
            }

            $query = "INSERT INTO `prompts`($fields) VALUES ($fieldValues);";
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