import Dashboard from './dashboard'
import Grid from '@material-ui/core/Grid'
import NoUserBlock from './noUserBlock'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { selectUserAccount } from '../../store/selectors'
import { useSelector } from 'react-redux'

const useStyles = makeStyles(theme => ({
  container: {
    ...theme.custom.setFlex('column nowrap', 'space-between'),
  },
  content: {
    flexGrow: 1,
    textAlign: 'center',
    maxWidth: 750,
    ...theme.custom.setFlex('column nowrap'),
    padding: `${theme.custom.setSpace('sm')}px ${theme.custom.setSpace()}px`,
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.custom.setSpace('md')}px ${theme.custom.setSpace('sm')}px`
    }
  },
  heading: {
    color: theme.palette.primary.A400
  },
  subtitle: {
    color: theme.palette.grey[700]
  },
  body: {
    color: theme.palette.common.white
  }
}))

export default () => {
  const classes = useStyles()
  const account = useSelector(state => selectUserAccount(state))
  return (
    <Grid component="header" className={classes.container}>
      <Grid className={classes.content}>
        <Typography variant="h4" className={classes.subtitle}>
          {process.env.APP_NAME} Exchange
        </Typography>
        <Typography variant="h1" className={classes.heading}>
          Et dolores amet dolor at magna consetetur vero eos
        </Typography>
        <Typography variant="body1" className={classes.body}>
          No lorem invidunt invidunt ea ipsum justo diam. Sed erat et vero stet
          et clita stet amet sed. Diam invidunt ut eos amet dolor ipsum labore
          invidunt, no erat et diam rebum eirmod amet eos sea justo. Diam amet
          sit lorem eirmod eirmod sit, et stet et sea voluptua invidunt.
        </Typography>
      </Grid>
      {account ? <Dashboard /> : <NoUserBlock />}
    </Grid>
  )
}
