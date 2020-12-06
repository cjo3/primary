import NcaResume from '@cjo3/shared/assets/svgs/nca-resume'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'
import CodeIcon from '@material-ui/icons/Code'
import SchoolIcon from '@material-ui/icons/School'
import clsx from 'clsx'
import React from 'react'
import { AngleBand } from '../AngleBand'
import {
  LogoAi,
  LogoApollo,
  LogoBir,
  LogoCodecore,
  LogoDappu,
  LogoEuroptimum,
  LogoHaru,
  LogoJumpfactor,
  LogoJuno,
  LogoSauder
} from '../assets'
import { skillCategory } from '../constants'
import {
  personalDetails,
  schoolEntries,
  softwareSkills,
  workEntries
} from '../content'
import { ContentContainer } from '../ContentContainer'
import { HeroBar } from '../HeroBar'
import { ResumeEntry } from './ResumeEntry'
import { SkillGraph } from './SkillGraph'

const useStyles = makeStyles(theme => ({
  sectionTitleIcon: {
    fontSize: theme.typography.fontSize * 4
  },
  seciontTitle: {
    ...theme.typography.shareTechMono,
    fontSize: theme.typography.fontSize * 2,
    margin: 0
  },
  white: {
    color: 'white'
  },
  red: {
    color: theme.palette.primary.main
  },
  resumeMain: {
    width: '100%',
    background: theme.custom.setLinearGradient(
      180,
      theme.palette.grey[200],
      'white'
    ),
    [theme.breakpoints.up('sm')]: {
      ...theme.custom.setFlex('row', 'center', 'flex-start')
    }
  },
  workSide: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '50%',
      ...theme.custom.setFlex('column', 'flex-start', 'flex-end')
    }
  },
  workInner: {
    width: '100%',
    padding: theme.custom.setSpace('sm'),
    [theme.breakpoints.up('sm')]: {
      maxWidth: 512
    }
  },
  workEntries: {
    maxWidth: 500,
    marginTop: theme.custom.setSpace('sm')
  },
  splitSide: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '50%',
      marginTop: theme.custom.setSpace('md')
    }
  },
  angle: {
    width: theme.custom.setSpace('sm') * 10,
    height: theme.custom.setSpace('sm'),
    backgroundColor: theme.palette.primary.main
  },
  angleFill: {
    flexGrow: 1,
    height: theme.custom.setSpace('sm'),
    [theme.breakpoints.up('sm')]: {
      marginLeft: -1
    },
    [theme.breakpoints.down(300)]: {
      display: 'none'
    }
  },
  topAngle: {
    clipPath: 'polygon(0 100%, 100% 0, 100% 100%)'
  },
  bottomAngle: {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%)'
  },
  redBg: {
    backgroundColor: theme.palette.primary.main
  },
  education: {
    padding: theme.custom.setSpace('sm'),
    margin: '-1px 0'
  },
  schoolEntries: {
    marginTop: theme.custom.setSpace('sm')
  },
  personalDetails: {
    maxWidth: 512,
    padding: theme.custom.setSpace('sm')
  },
  personalDetailsList: {
    padding: theme.custom.setSpace()
  },
  skillsContainer: {
    marginTop: theme.custom.setSpace('sm'),
    ...theme.custom.setGrid(1, 'auto', theme.custom.setSpace('md')),
    [theme.breakpoints.up('sm')]: {
      ...theme.custom.setGrid(3, 'auto', theme.custom.setSpace('md'))
    }
  },
  skills0: {
    gridColumn: '1 / 2',
    gridRow: 1
  },
  skills1: {
    gridColumn: '1 / 2',
    gridRow: 2,
    [theme.breakpoints.up('sm')]: {
      gridColumn: '2 / 3',
      gridRow: 1
    }
  },
  skills2: {
    gridColumn: '1 / 2',
    gridRow: 3,
    [theme.breakpoints.up('sm')]: {
      gridColumn: '3 / 4',
      gridRow: 1
    }
  },
  skills3: {
    gridColumn: '1 / 2',
    gridRow: 4,
    [theme.breakpoints.up('sm')]: {
      gridRow: 2
    }
  },
  skills4: {
    gridColumn: '1 / 2',
    gridRow: 5,
    [theme.breakpoints.up('sm')]: {
      gridColumn: '2 / 3',
      gridRow: 2
    }
  },
  skills5: {
    gridColumn: '1 / 2',
    gridRow: 6,
    [theme.breakpoints.up('sm')]: {
      gridColumn: '3 / 4',
      gridRow: 2
    }
  },
  skills6: {
    gridColumn: '1 / 2',
    gridRow: 7,
    paddingBottom: theme.custom.setSpace('sm'),
    [theme.breakpoints.up('sm')]: {
      gridRow: 3
    }
  }
}))

const logoMap = {
  haru: LogoHaru,
  bir: LogoBir,
  apollo: LogoApollo,
  jumpfactor: LogoJumpfactor,
  europtimum: LogoEuroptimum,
  juno: LogoJuno,
  codecore: LogoCodecore,
  dappu: LogoDappu,
  sauder: LogoSauder,
  ai: LogoAi
}

export const Resume: React.FC = (): JSX.Element => {
  const classes = useStyles()
  return (
    <Grid container justify="center">
      <HeroBar
        src={NcaResume}
        tagline="The 411 Lowdown of my Resume"
        alt="resume-image"
      />
      <AngleBand top left bgColor="theme.palette.grey[200]" />
      <Grid className={classes.resumeMain}>
        <Grid className={classes.workSide}>
          <Grid className={classes.workInner}>
            <BusinessCenterIcon className={classes.sectionTitleIcon} />
            <Typography component="h2" className={classes.seciontTitle}>
              work
              <br />
              history
            </Typography>
            <Grid className={classes.workEntries}>
              {workEntries.map(entry => (
                <ResumeEntry
                  key={entry.key}
                  work
                  logo={logoMap[entry.logo]}
                  title={entry.title}
                  subtitle={entry.subtitle}
                  period={entry.period}
                  bullets={entry.bullets}
                />
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid className={classes.splitSide}>
          <Grid container justify="flex-start" alignItems="flex-end">
            <Grid item className={clsx(classes.angle, classes.topAngle)} />
            <Grid item className={clsx(classes.angleFill, classes.redBg)} />
          </Grid>
          <Grid className={clsx(classes.education, classes.redBg)}>
            <SchoolIcon
              className={clsx(classes.sectionTitleIcon, classes.white)}
            />
            <Typography
              component="h2"
              className={clsx(classes.seciontTitle, classes.white)}>
              completed
              <br />
              education
            </Typography>
            <Grid className={classes.schoolEntries}>
              {schoolEntries.map(entry => (
                <ResumeEntry
                  key={entry.key}
                  logo={logoMap[entry.logo]}
                  title={entry.title}
                  subtitle={entry.subtitle}
                  period={entry.period}
                  bullets={entry.bullets}
                />
              ))}
            </Grid>
          </Grid>
          <Grid container justify="flex-start" alignItems="flex-start">
            <Grid item className={clsx(classes.angle, classes.bottomAngle)} />
            <Grid item className={clsx(classes.angleFill, classes.redBg)} />
          </Grid>
          <Grid className={classes.personalDetails}>
            <AssignmentIndIcon
              className={clsx(classes.sectionTitleIcon, classes.red)}
            />
            <Typography
              component="h2"
              className={clsx(classes.seciontTitle, classes.red)}>
              other
              <br />
              details
            </Typography>
            <ul className={classes.personalDetailsList}>
              {personalDetails.map(item => (
                <li key={item.key}>{item.label}</li>
              ))}
            </ul>
          </Grid>
        </Grid>
      </Grid>
      <AngleBand top right bgColor="theme.palette.grey[200]" />
      <ContentContainer gradient="theme.custom.setLinearGradient(180, theme.palette.grey[200], 'white')">
        <CodeIcon className={classes.sectionTitleIcon} />
        <Typography
          component="h2"
          className={clsx(classes.seciontTitle, classes.red)}>
          software stack
          <br />
          proficiency
        </Typography>
        <Grid className={classes.skillsContainer}>
          {[
            'language',
            'front',
            'back',
            'tool',
            'aws',
            'marketing',
            'design'
          ].map((item, index) => (
            <Grid className={classes[`skills${index}`]}>
              {softwareSkills
                .filter(skill => skill.category === skillCategory[item])
                .map(skill => (
                  <SkillGraph
                    label={skill.label}
                    key={skill.key}
                    level={skill.level}
                    category={skillCategory[item]}
                  />
                ))}
            </Grid>
          ))}
        </Grid>
      </ContentContainer>
    </Grid>
  )
}
