<table >
<tr>
  <th>Transaction</th>
  <th>Date/Time</th> 
  <th>Symbol</th>
  <th>Shares</th>
  <th>Price</th>
</tr>

    <?php

        foreach ($rows as $row)
        {
            
            $price = number_format($row["price"],2,'.',',');
            print("<tr>");
            print("<td>{$row["transaction"]}</td>");
            print("<td>{$row["timestamp"]}</td>");
            print("<td>{$row["symbol"]}</td>");
            print("<td>{$row["shares"]}</td>");
            print("<td>"."$".$price."</td>");
            print("</tr>");
        }
        

    ?>
</table>


