import { CardContent, Typography, Card } from '@material-ui/core'
import React from 'react'
import "./InfoBox.css";

function Infobox({title, cases, total, isRed, active, ...props}) {
    return (
        <Card className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"}`} onClick={props.onClick}>
 
            <CardContent>

            <Typography color="textSecondary">
              <h2>{title}</h2>
            </Typography>

            <Typography className={`infoBox__title ${!isRed && "infoBox__cases--green"} ${isRed && "infoBox__casses--red"}`}>
              <h2>{cases} Today</h2>
            </Typography>

            <Typography className="infoBox__total">
              <h2>{total} Total</h2>
            </Typography>

            </CardContent>
        </Card>
    )
}

export default Infobox;

