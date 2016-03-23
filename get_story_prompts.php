<?php
    if (empty($_POST['mode'])) {
        $mode = 'all';
    } else {
        switch ($_POST['mode']) {
            case 'story':
                $mode = 'story';
                break;
            case 'prompt':
                $mode = 'prompt';
                break;
            case 'single':
                $mode = 'single';
                break;
            default:
                http_response_code(403);
                exit();
        }
    }

    require('MySQL_connect.php');

    switch ($mode) {
        case 'story':
            if (empty($_POST['story_id']) || intval($_POST['story_id']) < 1) {
                http_response_code(403);
                exit();
            }
            $storyId = $_POST['story_id'];
            if (empty($_POST['per_page']) || intval($_POST['per_page']) < 1 || intval($_POST['per_page']) > 100) {
                $perPage = 25;
            } else {
                $perPage = intval($_POST['per_page']);
            }
            if (empty($_POST['page']) || intval($_POST['page']) < 1) {
                $page = 1;
            } else {
                $page = intval($_POST['page']);
            }
            $offset = ($page - 1) * $perPage;
            $query = "SELECT ID, prompt_id, response, created FROM story_prompts WHERE active=1 AND story_id=$storyId LIMIT $perPage OFFSET $offset";
            break;
        case 'prompt':
            if (empty($_POST['prompt_id']) || intval($_POST['prompt_id']) < 1) {
                http_response_code(403);
                exit();
            }
            $promptId = $_POST['prompt_id'];
            if (empty($_POST['per_page']) || intval($_POST['per_page']) < 1 || intval($_POST['per_page']) > 100) {
                $perPage = 25;
            } else {
                $perPage = intval($_POST['per_page']);
            }
            if (empty($_POST['page']) || intval($_POST['page']) < 1) {
                $page = 1;
            } else {
                $page = intval($_POST['page']);
            }
            $offset = ($page - 1) * $perPage;
            $query = "SELECT ID, response, created FROM story_prompts WHERE active=1 AND prompt_id=$promptId LIMIT $perPage OFFSET $offset";
            break;
        case 'single':
            if (empty($_POST['story_id']) || intval($_POST['story_id']) < 1) {
                http_response_code(403);
                exit();
            }
            if (empty($_POST['prompt_id']) || intval($_POST['prompt_id']) < 1) {
                http_response_code(403);
                exit();
            }
            $storyId = $_POST['story_id'];
            $promptId = $_POST['prompt_id'];
            $query = "SELECT ID, response, created FROM story_prompts WHERE active=1 AND story_id=$storyId AND prompt_id=$promptId";
            break;
    }
    $result = mysqli_query($connect, $query);
    while($row = mysqli_fetch_assoc($result)){
        $data[] = $row;
    }
    if (!empty($data)){
        $output['data'] = $data;
        $output['success'] = true;
    } else {
        $output['data'] = $data;
        $output['error_msg'] = 'empty data set';
        $output['success'] = false;
    }
    mysqli_close($connect);
    echo json_encode($output);
?>