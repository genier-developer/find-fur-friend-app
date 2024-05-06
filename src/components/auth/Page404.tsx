import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

export const Page404 = () => {
  const image = 'src/assets/images/404.jpg'

  return (
    <div style={{ textAlign: 'center' }}>
      <img alt={'404'} src={image} style={{ marginBottom: '20px', width: '50%' }} />
      <Typography variant={'h4'}>Sorry! The dog ate our page!</Typography>
      <Typography sx={{ marginBottom: 2, marginTop: 2 }} variant={'h1'}>
        404
      </Typography>
      <Button color={'primary'} component={Link} href={'/'} variant={'outlined'}>
        BACK HOME
      </Button>
    </div>
  )
}
