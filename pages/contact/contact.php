<?php
    header('Content-Type: text/html; charset=utf-8');

    // CONDITIONS NOM
    if ( (isset($_POST["name"])) && (strlen(trim($_POST["name"])) > 0) ) {
        $nom = stripslashes(strip_tags($_POST["name"]));
    }

    // CONDITIONS SUJET
    if ( (isset($_POST["subject"])) && (strlen(trim($_POST["subject"])) > 0) ) {
         $sujet = stripslashes(strip_tags($_POST["subject"]));
    }

    // CONDITIONS EMAIL
    if ( (isset($_POST["email"])) && (strlen(trim($_POST["email"])) > 0) && (filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) ) {
        $email = stripslashes(strip_tags($_POST["email"]));
    }

    // CONDITIONS MESSAGE
    if ( (isset($_POST["message"])) && (strlen(trim($_POST["message"])) > 0) ) {
        $message = stripslashes(strip_tags($_POST["message"]));
    }

    $EmailTo = "johannrouillon@gmail.com";
    $Subject =  $_POST["subject"];
    $email = $_POST["email"];
    $message = $_POST["message"];
    $name = $_POST["name"];

    $Body .= "Name: ";
    $Body .= $name;
    $Body .= "\n";
     
    $Body .= "Message: ";
    $Body .= $message;
    $Body .= "\n";

    $headers  = "CC: " . $email . " \r\n"; // ici l'expediteur du mail
    $headers .= "Content-Type: text/plain; charset=\"ISO-8859-1\"; DelSp=\"Yes\"; format=flowed /r/n";
    $headers .= "Content-Disposition: inline \r\n";
    $headers .= "Content-Transfer-Encoding: 7bit \r\n";
    $headers .= "MIME-Version: 1.0";

    mail($EmailTo, $Subject,$message,$headers);



