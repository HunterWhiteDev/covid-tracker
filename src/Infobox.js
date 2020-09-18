import { CardContent, Typography, Card } from '@material-ui/core'
import React from 'react'

function Infobox({title, cases, total}) {
    return (
        <Card className="infoBox">
            <CardContent>

            <Typography color="textSecondary">
              <h2>{title}</h2>
            </Typography>

            <Typography className="infoBox__cases">
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

