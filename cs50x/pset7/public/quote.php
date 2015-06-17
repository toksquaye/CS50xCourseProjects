<?php

    // configuration
    require("../includes/config.php");

    // if form was submitted
    if ($_SERVER["REQUEST_METHOD"] == "POST")
    {
        // TODO
        // validate submission
        if (empty($_POST["stocksymbol"]))
        {
            apologize("You must provide a stock symbol");
        }
        
        $stockquote = lookup($_POST["stocksymbol"]);
        
        if ($stockquote === false)
        {
            apologize("Symbol not found");
        }
        $name = $stockquote["name"];
        $symbol = $stockquote["symbol"];
        $price = number_format($stockquote["price"],2,'.',' ');
        
        render("quote.php", ["name" => $name,"symbol" => $symbol, "price" => $price]);
        
        
    }
    else
    {
        // else render form
        render("quote_form.php", ["title" => "Quote"]);
    }

?>
