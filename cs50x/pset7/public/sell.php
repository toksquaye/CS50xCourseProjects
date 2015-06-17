<?php

    // configuration
    require("../includes/config.php");

    // if form was submitted
    if ($_SERVER["REQUEST_METHOD"] == "POST")
    {
        
        // validate submission
        if (($_POST["symbol"]) == " ")
        {
            apologize("You must provide a stock symbol");
        }
        
        //get the number of shares for the stock to sell
        $rows = query("SELECT shares FROM portfolio WHERE id = ? AND symbol = ?",$_SESSION["id"],strtoupper($_POST["symbol"]));
        if($rows === false)
        {
            apologize("Stock not found in your portfolio");
        }
        
        //delete it from database
        $d_shares = query("DELETE FROM portfolio WHERE id = ? AND symbol = ?",$_SESSION["id"],strtoupper($_POST["symbol"]));
        if ($d_shares === false)
        {
            apologize("Unable to sell the stocks");
        }
        
        $stockquote = lookup($_POST["symbol"]);
        $profit = $stockquote["price"] * $rows[0]["shares"];
        $positions = query("UPDATE users SET cash= cash + ? WHERE id = ?",$profit,$_SESSION["id"]);

//update history
        query("INSERT INTO History(id,transaction,symbol,shares,price) VALUES (?,'SELL',?,?,?)",$_SESSION["id"],strtoupper($_POST["symbol"]),$rows[0]["shares"],$stockquote["price"]);
                
        redirect("index.php");
        
    }
    else
    {
        // else render form
        render("sell_form.php", ["title" => "Sell"]);
    }

?>


