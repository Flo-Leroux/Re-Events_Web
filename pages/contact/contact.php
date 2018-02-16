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

    $headers  = 'MIME-Version: 1.0' . "\n"; // Version MIME
    $headers .= 'Content-type: text/html; charset=ISO-8859-1'."\n"; // l'en-tete Content-type pour le format HTML
    $headers .= 'Reply-To: '.$email."\n"; // Mail de reponse
    $headers .= 'From: "Re-Events"<'.$email.'>'."\n"; // Expediteur
    $headers .= 'Delivered-to: '.$EmailTo."\n"; // Destinataire      
    $message = '<div style="width: 100%; text-align: center; font-weight: bold">'.$message.'</div>';
    if (mail($EmailTo, $Subject, $message, $headers)) // Envoi du message
    {
         //echo 'ok';
        header('Location: ' . $_SERVER['HTTP_REFERER']);
    }
    else // Non envoyé
    {
        //echo 'Nope';            
        header('Location: ' . $_SERVER['HTTP_REFERER']);
    }



