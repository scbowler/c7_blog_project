<?php
    switch($_POST['mode']) {
        case 'all':
            $mode = 'all';
            break;
        case 'single':
            $mode = 'single';
            break;
        default:
            if (!empty($_POST['prompt_id'])) {
                $mode = 'single';
            } else {
                $mode = 'all';
            }
    }

    require('MySQL_connect.php');

    switch ($mode) {
        case 'all':
            if (empty($_POST['page']) || intval($_POST['page']) < 1) {
                $page = 1;
            } else {
                $page = intval($_POST['page']);
            }
            if (empty($_POST['per_page']) || intval($_POST['per_page']) < 1 || intval($_POST['per_page']) > 100) {
                $perPage = 25;
            } else {
                $perPage = intval($_POST['per_page']);
            }
            $offset = ($page - 1) * $perPage;
            $query = "SELECT ID, title, description, category, genre, setting, user_id, created FROM prompts WHERE active=1 LIMIT $perPage OFFSET $offset";
            break;
        case 'single':
            $promptId = intval($_POST['prompt_id']);
            $query = "SELECT title, description, category, genre, setting, user_id, created FROM prompts WHERE active=1 AND ID=$promptId";
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
    echo json_encode($output);
?>