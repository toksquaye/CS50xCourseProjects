<?php

    // configuration
    require("../includes/config.php");
    require_once("PHPMailer/class.phpmailer.php");

    // if form was submitted
    if ($_SERVER["REQUEST_METHOD"] == "POST")
    {
      
        // validate submission
        if (empty($_POST["symbol"]))
        {
            apologize("You must provide a stock symbol");
        }
        if (empty($_POST["shares"]))
        {
            apologize("You must provide the number of shares you wish to buy");
        }
        
        $c_shares = preg_match("/^\d+$/", $_POST["shares"]);
        if($c_shares < 0)
        {
            apologize("Please enter a non-negative number");
        }
        
        $quote = lookup($_POST["symbol"]);
        if($quote === false)
        {
            apologize("Invalid stock symbol");
        }
        
        $cost = $quote["price"] * $_POST["shares"];
        
        $row = query("SELECT * FROM users WHERE id = ?",$_SESSION["id"]);
        
        if( $cost > $row[0]["cash"])
        {
            apologize("You do not have enough cash to make this purchase");            
        }

        // insert into database        
        query("INSERT INTO portfolio(id,symbol,shares) VALUES (?,?,?) ON DUPLICATE KEY UPDATE shares = shares + ?",$_SESSION["id"],strtoupper($_POST["symbol"]),$_POST["shares"],$_POST["shares"]);
        //get the number of shares for the stock to sell
        
        //update cash
        query("UPDATE users SET cash= cash - ? WHERE id = ?",$cost,$_SESSION["id"]);

        //update history
        query("INSERT INTO History(id,transaction,symbol,shares,price) VALUES (?,'BUY',?,?,?)",$_SESSION["id"],strtoupper($_POST["symbol"]),$_POST["shares"],$quote["price"]);
        
        //send email reciept
        $mail = new PHPMailer();
        $mail->IsSMTP();
        $mail->SMTPDebug = 2;
        //$mail->SMTPAuth    = TRUE; // enable SMTP authentication
        //$mail->SMTPSecure  = "ssl"; //Secure conection
        //$mail->Port        = 465; // set the SMTP port
        $mail->Host = "smtp.mail.yahoo.com";
        $mail->SetFrom("olubimpe.olatokunbo@yahoo.com");
        $mail->Password    = "Testcases1";
        $mail->AddAddress($row[0]["email"]);
        $mail->Subject = "Stocks Purchase Receipt";
        $mail->Body =
        "This is a receipt of the stocks you recently purchased.\n" .
        "Stock Symbol: ". $_POST["symbol"] . "\n" .
        "# of Shares: " . $_POST["shares"] . "\n" .
        "Cost per share: " . $quote["price"] . "\n" .
        "Total Cost: " . $cost . "\n" ;
        
        if($mail->Send() === false)
        {
            die($mail->ErrorInfo);
        }
        
        
        
        
            
        redirect("index.php");
      
        
    }
    else
    {
        // else render form
        render("buy_form.php", ["title" => "Buy"]);
    }

?>


