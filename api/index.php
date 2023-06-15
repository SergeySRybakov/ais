<?php
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body, true);

    $inputValue = $data['inputValue'];
    $selectorValue = $data['selectorValue'];
	$arr = [];
	$id = 0;
	
//SELECT COUNT(mmsi) FROM aisBig WHERE mmsi = 471194000

    $link = mysqli_connect("10.215.23.72", "root", "YnBzLfULr9", "AIS") or die('jfndvjnv');

	$count = mysqli_fetch_assoc(mysqli_query($link, "SELECT COUNT(mmsi) FROM aisBig WHERE mmsi = $inputValue"));
	$count = $count['COUNT(mmsi)'];
	settype($count, "integer");
	/* print(json_encode($count['COUNT(mmsi)'])); */

    if ($db->connect_error) {
      echo "Нет подключения к БД. Ошибка:".mysqli_connect_error();
      exit;
    }

    if ($selectorValue == 'mmsi') {
      if ($count > 1) {
		for ($i = 0; $i < $count; $i++) {
			$first = mysqli_query($link, "SELECT * FROM aisBig WHERE mmsi = $inputValue AND id > $id");
			$info = mysqli_fetch_array($first);
			$id = $info['id'];
			$arr[$i] = $info;
		}

//SELECT * FROM aisBig WHERE mmsi = 471194000 AND id > 700
		print(json_encode($arr, $count));

      } else {
        $info = mysqli_fetch_assoc(mysqli_query($link, "SELECT * FROM aisBig WHERE mmsi = $inputValue"));
		print(json_encode($info));
      }

    } elseif ($selectorValue == 'name') {
      $info = mysqli_fetch_assoc(mysqli_query($link, "SELECT * FROM aisBig WHERE nameV = '$inputValue'"));
	  print(json_encode($info));
    }	
   
//SELECT mmsi, COUNT(*) c FROM aisBig GROUP BY mmsi HAVING c > 1;
    mysqli_close($link);
?>