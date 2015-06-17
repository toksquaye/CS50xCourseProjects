<div class="menu">
    <a href="quote.php">Quote</a> &emsp;
    <a href="buy.php">Buy</a> &emsp; 
    <a href="sell.php">Sell</a>  &emsp;
    <a href="history.php"> History</a> &emsp;
    <a href="deposit.php"> Deposit </a> &emsp;
    <a href="logout.php"><strong>Log Out</strong></a>
</div>
<br/>
<table >
<tr>
  <th>Symbol</th>
  <th>Name</th> 
  <th>Price</th>
  <th>Shares</th>
  <th>Total</th>
</tr>

    <?php

        foreach ($positions as $position)
        {
            $total = number_format($position["shares"] * $position["price"],2,'.',',');
            $price = number_format($position["price"],2,'.',',');
            print("<tr>");
            print("<td>{$position["symbol"]}</td>");
            print("<td>{$position["name"]}</td>");
            print("<td>"."$".$price."</td>");
            print("<td>{$position["shares"]}</td>");
            print("<td>"."$".$total."</td>");
            print("</tr>");
        }
        $fcash = number_format($cash,2,'.',',');
        print("<tr>");
        print("<td><b>CASH</b></td>");
        print("<td></td>");
        print("<td></td>");
        print("<td></td>");
        print("<td><b>"."$".$fcash."</b></td>");
        print("</tr>");
        

    ?>
</table>
<br/>
<div class="bottommenu">
    <a href="pass_reset.php">Change Password</a> &emsp;
</div>


