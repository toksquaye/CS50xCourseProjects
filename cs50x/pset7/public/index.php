

<?php

    // configuration
    require("../includes/config.php"); 

    // gets all the stocks owned by the current user
    $rows = query("SELECT symbol,shares FROM portfolio WHERE id = ?",$_SESSION["id"]);
    $positions = [];
    
    // for each stock owned, look up it's price & stock name.
    // fill up $positions with each stock name, price, # of shares owned and symbol
    foreach ($rows as $row)
    {
        $stock = lookup($row["symbol"]);
        if ($stock !== false)
        {
            $positions[] = [
                "name" => $stock["name"],
                "price" => $stock["price"],
                "shares" => $row["shares"],
                "symbol" => $row["symbol"]
                ];
        }
    }
    $cashrow = query("SELECT cash FROM users WHERE id = ?",$_SESSION["id"]);
    $cash = $cashrow[0]["cash"];
    // render portfolio. send positions array to portfolio
   render("portfolio.php", ["title" => "Portfolio", "positions" => $positions,"cash" => $cash] );

?>
 
 
