import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles(() => ({
  cardOrder: {
    backgroundColor: 'rgb(208, 242, 255)',
    paddingTop: 40,
    paddingBottom: 40,
    borderRadius: 12,
    flex: 1
  },
  cardOrdered: {
    backgroundColor: 'rgb(209, 233, 252)',
    paddingTop: 40,
    paddingBottom: 40,
    borderRadius: 12,
    flex: 1
  },
  cardUser: {
    backgroundColor: 'rgb(255, 231, 217)',
    paddingTop: 40,
    paddingBottom: 40,
    borderRadius: 12,
    flex: 1
  },
  cardRevenue: {
    backgroundColor: 'rgb(255, 247, 205)',
    paddingTop: 40,
    paddingBottom: 40,
    borderRadius: 12,
    flex: 1
  },
  cardIcon: {
    borderRadius: '50%',
    margin: 'auto',
    marginBottom: 20,
    backgroundImage: 'linear-gradient(135deg, rgba(16, 57, 150, 0) 0%, rgba(16, 57, 150, 0.24) 100%)'
  }
}))
