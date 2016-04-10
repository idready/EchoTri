
<?php


  if(isset($_REQUEST['email'])) {

    $name = htmlentities( strip_tags($_REQUEST['name']) );
    $firstName = htmlentities( strip_tags($_REQUEST['firstName']) );
    $telephone = htmlentities( strip_tags($_REQUEST['telephone']) );
    $email = htmlentities( strip_tags($_REQUEST['email']) );
    $rs = htmlentities( strip_tags($_REQUEST['rs']) );
    $company = htmlentities( strip_tags($_REQUEST['company']) );
    $message = htmlentities( strip_tags($_REQUEST['message']) );

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {

      echo 'Email '.$email.' invalide, merci de modifier votre email.';
      return false;
    }

    $to = 'dude72@hotmail.fr';
    $body = '<!doctype html><html><head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Message depuis alamaisondubonheur.fr</title>
      </head>
      <body>
        <p>Information sur l\'exp&eacute;diteur du message</p>
        <p>Nom: <strong>'.$name.'</strong></p>
        <p>Pr&eacute;nom: <strong>'.$firstName.'</strong></p>
        <p>T&eacute;l&eacute;phone: <strong>'.$telephone.'</strong></p>
        <p>Email: <strong>'.$email.'</p>
        <p>Son message:<br /><br /> <strong>'.$message.'</strong></p>
      </body>
      </html>
      ';

    $headers = "From: ".$email." \r\n";
    $headers .= "Reply-To: ". strip_tags(''.$to) . "\r\n";
    $headers .= "CC: ". $to . "\r\n";
    $headers .= "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";

    if( mail($to, $subject, $body, $headers) ) {

      echo json_encode(array('message' => 'Votre message a été envoyé avec succès.', 'status' => true));
    } else {

      echo json_encode(array('message' => 'Echec de l\'envoi, merci d\'envoyer de nouveau.', 'status' => false));
    }



  } else {

    echo 'Failure';
  }
?>
