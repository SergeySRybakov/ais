<?php

    $link = mysqli_connect("10.215.23.72", "root", "YnBzLfULr9", "AIS") or die('jfndvjnv');

    if ($db->connect_error) {
      echo "Нет подключения к БД. Ошибка:".mysqli_connect_error();
      exit;
    }

    if ( isset($_POST['btn'])) {
        $input = $_POST['subject'];
    }

    $info = mysqli_fetch_assoc(mysqli_query($link, "SELECT * FROM aisBig WHERE mmsi = $inputValue"));

    mysqli_close($link);
    print(json_encode($info));
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form name="form" action="" method="post">
        <input type="text" name="subject" id="subject" value="Car Loan">
        <input type="button" name="btn" value="Get info">
    </form>
</body>
</html>